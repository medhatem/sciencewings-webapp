import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import {
  FuseNavigationItem,
  FuseNavigationItemTypeEnum,
  FuseNavigationService,
  FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { Subject, takeUntil } from 'rxjs';
import { appRoutes, errorPath } from 'app/app.routing';

import { CookieService } from 'ngx-cookie-service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseSplashScreenService } from '@fuse/services/splash-screen/splash-screen.service';
import { KeycloakService } from 'keycloak-angular';
import { SwitchOrganizationsService } from 'app/layout/common/switch-organization/switch-organization.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { User } from 'app/core/user/user.types';
import { UserOrganizations } from 'app/models/organizations/user-organizations';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'classy-layout',
  templateUrl: './classy.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy, OnChanges {
  @Input() hideMenusAndButtons: boolean;
  @Output() onHideMenusAndButtonsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isScreenSmall: boolean;
  navigation: FuseNavigationItem[];
  user: User;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fuseNavigationService: FuseNavigationService,
    private _coookies: CookieService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _keycloackService: KeycloakService,
    private _toastrService: ToastrService,
    private _switchOrganizationsService: SwitchOrganizationsService,
  ) {}

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetNavigation(changes.hideMenusAndButtons.currentValue);
  }

  ngOnInit(): void {
    const { userData } = this._route.snapshot.data;
    //this.resetNavigation(this.hideMenusAndButtons);

    this.user = {
      ...userData,
      avatar: 'assets/images/avatars/brian-hughes.jpg',
      status: 'online',
    };

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
      // Check if the screen is small
      this.isScreenSmall = !matchingAliases.includes('md');
    });

    this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
      this.isScreenSmall = !matchingAliases.includes('md');
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle navigation
   *
   * @param name
   */
  toggleNavigation(name: string): void {
    // Get the navigation
    const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }

  /**
   * Hide/Show navigation
   *
   * @param hideNavigation
   */
  resetNavigation(hideNavigation: boolean) {
    try {
      this._fuseSplashScreenService.show();
      if (this.hideMenusAndButtons !== hideNavigation) {
        this.hideMenusAndButtons = hideNavigation;
        this.onHideMenusAndButtonsChange.emit(this.hideMenusAndButtons);
      }
      if (hideNavigation) {
        this.navigation = [];
      } else {
        const url = this._coookies.get(constants.ROUTING_URL) || constants.ROUTINGS_URLS.ADMIN;
        const routesToDisplay = appRoutes[0].children.find(({ path }) => path === url);
        this.navigation = this.getNavigationItemsFromRoutes(routesToDisplay.children, `/${routesToDisplay.path}`);
      }
    } catch (error) {
      this._toastrService.showError(constants.FATAL_ERROR_OCCURED);
      this.terminateAllTasksAndLogout();
    } finally {
      setTimeout(() => {
        this._fuseSplashScreenService.hide();
      }, 1000);
    }
  }

  /**
   * Stores the url of the module chosed in cookies
   * resets the navigation config to regenerate the links and routes
   * calls resetNavigation to change navigation items, and animate the transition between modules
   *
   * @params url: string
   */
  onSwitchModule(url: string) {
    this._coookies.set(constants.ROUTING_URL, url);
    this._router.resetConfig(appRoutes[0].children.find(({ path }) => path === url).children);
    this.resetNavigation(false);
  }

  /**
   * reset the user organization
   * calls resetNavigation to change refresh token, and animate the transition between modules
   *
   * @params organization: Partial<UserOrganizations>
   */
  onActiveOrganizationChange(organization: Partial<UserOrganizations>) {
    this._switchOrganizationsService.switchOrganization(organization.id as number);
    this.resetNavigation(false);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Build navigation array of FuseNavigationItem
   * from routes of type { Route } from '@angular/router';
   *
   * @param routes
   * @param parentPath (optional)
   */
  private getNavigationItemsFromRoutes(routes: Route[], parentPath: string = ''): FuseNavigationItem[] {
    return routes.reduce((acc, { path = '', data, children = [] }) => {
      const { title = path, type = FuseNavigationItemTypeEnum.basic, icon, action } = data || {};
      if (path === errorPath) {
        return acc;
      }
      const id = `${parentPath}.${path}`.replace('/', '');
      const link = `${parentPath ? `${parentPath}` : ''}/${path}`;
      const navigationItem = { id, title, type, link } as FuseNavigationItem;
      if (children?.length) {
        navigationItem.children = this.getNavigationItemsFromRoutes(children, link);
      }
      if (icon) {
        navigationItem.icon = icon;
      }

      acc.push(navigationItem);
      return acc;
    }, []);
  }

  private terminateAllTasksAndLogout() {
    this._coookies.deleteAll();
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    // setTimeout(() => {
    //   this._keycloackService.logout();
    // }, 5000);
  }
}
