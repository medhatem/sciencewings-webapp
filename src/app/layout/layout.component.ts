import { Component, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, filter, map, Subject, takeUntil } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FUSE_VERSION } from '@fuse/version';
import { Layout } from 'app/layout/layout.types';
import { AppConfig } from 'app/core/config/app.config';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { NewUserInfosResolver } from './new-user-infos/new-user-infos.resolver';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit, OnDestroy {
  config: AppConfig;
  layout: Layout;
  scheme: 'dark' | 'light';
  theme: string;
  hideMenusAndButtons: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private _route: ActivatedRoute,
    private _activatedRoute: ActivatedRoute,
    private _renderer2: Renderer2,
    private _router: Router,
    private _fuseConfigService: FuseConfigService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _newUserInfosResolver: NewUserInfosResolver,
    private _toastrService: ToastrService,
  ) {}

  async ngOnInit() {
    const { userKeycloackData } = this._route.snapshot.data;
    await this.checkIfUserExistsAndShowOrHideRegistrationForm(userKeycloackData.id);
    this.initializeAppConfigsShcemasLayouts();
    this.subscribeToConfigChanges();
    this.subscribeToNavigationEndEvent();
    this.setTheAppVersion();
  }

  /**
   * On destroy.
   * Unsubscribe from all subscriptions.
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
   * Initialize schemas and configs, and subscribe to their changes.
   */
  private initializeAppConfigsShcemasLayouts() {
    combineLatest([
      this._fuseConfigService.config$,
      this._fuseMediaWatcherService.onMediaQueryChange$(['(prefers-color-scheme: dark)', '(prefers-color-scheme: light)']),
    ])
      .pipe(
        takeUntil(this._unsubscribeAll),
        map(([config, mql]) => {
          const options = {
            scheme: config.scheme,
            theme: config.theme,
          };
          // If the scheme is set to 'auto'...
          if (config.scheme === 'auto') {
            // Decide the scheme using the media query
            options.scheme = mql.breakpoints['(prefers-color-scheme: dark)'] ? 'dark' : 'light';
          }
          return options;
        }),
      )
      .subscribe((options) => {
        // Store the options
        this.scheme = options.scheme;
        this.theme = options.theme;

        // Update the scheme and theme
        this._updateScheme();
        this._updateTheme();
      });
  }

  /**
   * Subscribe to config changes.
   * 1 - Store the config
   * 2 - Update the layout
   */
  private subscribeToConfigChanges() {
    this._fuseConfigService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe((config: AppConfig) => {
      this.config = config;
      this._updateLayout();
    });
  }

  /**
   * Set The Fuse App Version.
   */
  private setTheAppVersion() {
    this._renderer2.setAttribute(this._document.querySelector('[ng-version]'), 'fuse-version', FUSE_VERSION);
  }

  /**
   * Update the selected layout.
   *
   * Get the current activated route.
   *
   * 1. Set the layout from the config.
   *
   * 2. Get the query parameter from the current route,
   *    and set the layout and save the layout to the config
   *
   * 3. Iterate through the paths and change the layout as we find a config for it.
   *    The reason we do this is that there might be empty grouping
   *    paths or componentless routes along the path. Because of that,
   *    we cannot just assume that the layout configuration will be
   *    in the last path's config or in the first path's config.
   *
   *    So, we get all the paths that matched starting from root all
   *    the way to the current activated route, walk through them one
   *    by one and change the layout as we find the layout config. This
   *    way, layout configuration can live anywhere within the path and
   *    we won't miss it.
   *
   *    Also, this will allow overriding the layout in any time so we
   *    can have different layouts for different routes.
   */
  private _updateLayout(): void {
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.layout = this.config.layout;

    const layoutFromQueryParam = route.snapshot.queryParamMap.get('layout') as Layout;
    if (layoutFromQueryParam) {
      this.layout = layoutFromQueryParam;
      if (this.config) {
        this.config.layout = layoutFromQueryParam;
      }
    }

    const paths = route.pathFromRoot;
    paths.forEach((path) => {
      if (path.routeConfig && path.routeConfig.data && path.routeConfig.data.layout) {
        this.layout = path.routeConfig.data.layout;
      }
    });
  }

  /**
   * Update the selected scheme.
   * Remove class names for all schemes.
   * Add class name for the currently selected scheme.
   *
   * @private
   */
  private _updateScheme(): void {
    this._document.body.classList.remove('light', 'dark');
    this._document.body.classList.add(this.scheme);
  }

  /**
   * Update the selected theme.
   * Find the class name for the previously selected theme and remove it.
   * Add class name for the currently selected theme.
   *
   * @private
   */
  private _updateTheme(): void {
    this._document.body.classList.forEach((className: string) => {
      if (className.startsWith('theme-')) {
        this._document.body.classList.remove(className, className.split('-')[1]);
      }
    });
    this._document.body.classList.add(`theme-${this.theme}`);
  }

  /**
   * Checks if the connected keycloack user exists in our db.
   * Shows and hides registration form for no registred user.
   *
   * @param userKeycloackId
   */
  private async checkIfUserExistsAndShowOrHideRegistrationForm(userKeycloackId: string) {
    try {
      const user = await this._newUserInfosResolver.getUser(userKeycloackId);
      if (user) {
        localStorage.setItem(constants.CURRENT_USER_ID, `${user.id}`);
        this.hideMenusAndButtons = false;
      } else {
        this.hideMenusAndButtons = true;
      }
    } catch (error) {
      this.hideMenusAndButtons = true;
      this._toastrService.showInfo('APP.NEW_USER_INFOS_REQUIRED');
    }
  }

  /**
   * subscribe To Navigation End Event.
   * Update the layout.
   */
  private subscribeToNavigationEndEvent() {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll),
      )
      .subscribe(() => {
        this._updateLayout();
      });
  }
}
