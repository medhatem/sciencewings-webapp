import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FuseNavigationItem,
  FuseNavigationItemTypeEnum,
  FuseNavigationService,
  FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { Subject, takeUntil } from 'rxjs';
import { appRoutes } from 'app/app.routing';

import { CookieService } from 'ngx-cookie-service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseSplashScreenService } from '@fuse/services/splash-screen/splash-screen.service';
import { SwitchOrganizationsService } from 'app/layout/common/switch-organization/switch-organization.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { User } from 'app/core/user/user.types';
import { UserOrganizations } from 'app/models/organizations/user-organizations';
import { constants } from 'app/shared/constants';
import { SharedHelpers } from 'app/shared/helpers';
import { SwitchOrganizationComponent } from 'app/layout/common/switch-organization/switch-organization.component';
import { LandingPageComponent } from 'app/modules/admin/dashboard/landing-page/landing-page.component';

@Component({
  selector: 'classy-layout',
  templateUrl: './classy.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy, OnChanges {
  @Input() hideMenusAndButtons: boolean;
  @Output() onHideMenusAndButtonsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild(SwitchOrganizationComponent) switchOrganization: SwitchOrganizationComponent;

  isScreenSmall: boolean;
  navigation: FuseNavigationItem[];
  user: User;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fuseNavigationService: FuseNavigationService,
    private _cookies: CookieService,
    private _fuseSplashScreenService: FuseSplashScreenService,
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
    if (!localStorage.getItem(constants.CURRENT_MODULE)) {
      localStorage.setItem(constants.CURRENT_MODULE, constants.MODULES_ROUTINGS_URLS.ADMIN);
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

  onActivate(event) {
    if (event instanceof LandingPageComponent) {
      event.selectOrganizationEvent.subscribe((id) => {
        this.onActiveOrganizationChange(id);
        this._router.navigate([event.organizationProfilePath, id]);
      });
    }
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
   *
   * @param hideNavigation
   */
  resetNavigation(hideNavigation: boolean): void {
    try {
      this._fuseSplashScreenService.show();
      if (this.hideMenusAndButtons !== hideNavigation) {
        this.hideMenusAndButtons = hideNavigation;
        this.onHideMenusAndButtonsChange.emit(this.hideMenusAndButtons);
      }
      if (hideNavigation) {
        this.navigation = [];
      } else {
        this.loadNavigationItemsFromRoutes();
      }
    } catch (error) {
      this._toastrService.showError(constants.FATAL_ERROR_OCCURED);
      SharedHelpers.terminateAllTasksAndLogout(this._cookies, [this._unsubscribeAll]);
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
    localStorage.setItem(constants.CURRENT_MODULE, url);
    this.resetNavigation(false);
  }

  /**
   * reset the user organization
   * calls resetNavigation to change refresh token, and animate the transition between modules
   *
   * @params organization: Partial<UserOrganizations>
   */
  onActiveOrganizationChange(organizationId: number) {
    this._switchOrganizationsService.switchOrganization(organizationId);
    this.resetNavigation(false);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Builds navigation items from application routes
   * based on Selected Organization & Selected Module
   *
   * Returns only Landing Page if no organization selected
   */
  private loadNavigationItemsFromRoutes(): void {
    const applicationRoutes = appRoutes[0].children;
    const navigationItems = [applicationRoutes.find(({ path }) => path === constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.LANDING_PAGE)];

    const currentOrganization = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    if (!!currentOrganization) {
      // this.switchOrganization?.setActiveOrganization();
      const modulePath = localStorage.getItem(constants.CURRENT_MODULE) || constants.MODULES_ROUTINGS_URLS.ADMIN;
      navigationItems.push(applicationRoutes.find(({ path }) => path === modulePath));
    }

    this.navigation = this.buildNavigationItemsFromRoutes(navigationItems);
    this.redirectToParentOrFirstChild(navigationItems[0]);
  }

  /**
   * Build navigation array of FuseNavigationItem items.
   * Takes a list of routes and the parent path,
   * then builds the navigation menu based on the data of the routes.
   * Note: from routes of type { Route } from '@angular/router';
   *
   * @param routes
   * @param parentPath (optional)
   */
  private buildNavigationItemsFromRoutes(routes: Route[], parentPath: string = ''): FuseNavigationItem[] {
    return routes.reduce((acc, { path = '', data, children = [] }) => {
      const { title = path, type = FuseNavigationItemTypeEnum.basic, icon, action } = data || {};
      if (path === constants.MODULES_ROUTINGS_URLS.ERROR_PAGE) {
        return acc;
      }
      const id = `${parentPath}.${path}`.replace('/', '');
      const link = `${parentPath ? `${parentPath}` : ''}/${path}`;
      const navigationItem = { id, title, type, link } as FuseNavigationItem;
      if (children?.length) {
        navigationItem.children = this.buildNavigationItemsFromRoutes(children, link);
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
}
