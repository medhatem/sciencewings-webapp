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
   * Getter of the current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  ngOnInit(): void {
    const { userData } = this._route.snapshot.data;
    this._router.onSameUrlNavigation = 'ignore';
    /**
     * Set ADMINISTRATION module by default
     */
    if (!localStorage.getItem(constants.MODULE_ROUTING_URL)) {
      localStorage.setItem(constants.MODULE_ROUTING_URL, constants.MODULES_ROUTINGS_URLS.ADMIN);
    }
    /**
     * Temporary modification until implementation of images handling and User status
     */
    this.user = {
      ...userData,
      avatar: 'assets/images/avatars/brian-hughes.jpg',
      status: 'online',
    };
    /**
     * Subscribe to media changes
     * Check if the screen is small
     */
    this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
      this.isScreenSmall = !matchingAliases.includes('md');
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetNavigation(changes.hideMenusAndButtons.currentValue);
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
   * Hide/Show the fullscreen Loading page
   * this can be called whenever you need to show loading page and rechecking routes
   * hideNavigation: Hide/Show navigation menu
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
        const moduleUrl = localStorage.getItem(constants.MODULE_ROUTING_URL) || constants.MODULES_ROUTINGS_URLS.ADMIN;
        const routesToDisplay = appRoutes[0].children.find(({ path }) => path === moduleUrl);
        this.navigation = this.getNavigationItemsFromRoutes(routesToDisplay.children, `/${routesToDisplay.path}`);
        this.redirectToParentOrFirstChild(routesToDisplay);
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
   * Stores the url of the module chosen in cookies
   * resets the navigation config to regenerate the links and routes
   * calls resetNavigation to change navigation items, and animate the transition between modules
   *
   * @params url: string
   */
  onSwitchModule(url: string) {
    localStorage.setItem(constants.MODULE_ROUTING_URL, url);
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
   * Build navigation array of FuseNavigationItem items.
   * Takes a list of routes and the parent path,
   * then builds the navigation menu based on the data of the routes.
   * Note: from routes of type { Route } from '@angular/router';
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

  /**
   * check if the route passed has a component or a loaded lazy module with component
   * redirects to this component if true
   * redirects to first child if false
   *
   * @param route: Route
   */
  private redirectToParentOrFirstChild(route: Route) {
    const { path, component, loadChildren, children } = route;
    const redirectToPath = path ? ['/', path] : [''];
    if (!component && !loadChildren && children[0]?.path) {
      redirectToPath.push(children[0].path);
    }
    this._router.navigate(redirectToPath);
  }

  /**
   * Unsubscribe from All and clears all the data in the browser and logs out the user.
   */
  private terminateAllTasksAndLogout() {
    this._coookies.deleteAll();
    localStorage.clear();
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    setTimeout(() => {
      this._keycloackService.logout();
    }, 5000);
  }
}
