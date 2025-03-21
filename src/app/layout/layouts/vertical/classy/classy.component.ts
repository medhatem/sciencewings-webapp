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
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseSplashScreenService } from '@fuse/services/splash-screen/splash-screen.service';
import { SwitchOrganizationsService } from 'app/layout/common/switch-organization/switch-organization.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { User } from 'app/core/user/user.types';
import { constants } from 'app/shared/constants';
import { SharedHelpers } from 'app/shared/helpers';
import { LandingPageComponent } from 'app/modules/admin/dashboard/landing/landing-page/landing-page.component';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { SwitchOrganizationComponent } from 'app/layout/common/switch-organization/switch-organization.component';

@Component({
  selector: 'classy-layout',
  templateUrl: './classy.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy, OnChanges {
  @Input() hideMenusAndButtons: boolean;
  @Output() onHideMenusAndButtonsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild(SwitchOrganizationComponent) switchOrganizationComponent: SwitchOrganizationComponent;

  isScreenSmall: boolean;
  navigation: FuseNavigationItem[];
  user: User;
  marketplace: boolean = false;
  private isAppReachedByUrl: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _toastrService: ToastrService,
    private _switchOrganizationsService: SwitchOrganizationsService,
    private _adminOrganizationsService: AdminOrganizationsService,
    private _sharedHelpers: SharedHelpers,
  ) {}

  /**
   * Getter of the current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  ngOnInit(): void {
    const { userKeycloackData } = this._route.snapshot.data;
    this._router.onSameUrlNavigation = 'ignore';
    this.setSelectedModule();
    this.subscribeToMediaChangesAndScreenSizeCheck();
    localStorage.setItem(constants.MARKET_PLACE, 'false');

    /**
     * Temporary modification until implementation of images handling and User status
     */
    this.user = {
      ...userKeycloackData,
      avatar: 'assets/images/avatars/brian-hughes.jpg',
      status: 'online',
    };
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  async ngOnChanges(changes: SimpleChanges) {
    await this.resetNavigation(changes.hideMenusAndButtons.currentValue);
  }

  onActivate(event) {
    if (event instanceof LandingPageComponent) {
      event.selectOrganizationEvent.subscribe((id) => {
        if (this.switchOrganizationComponent) {
          this.switchOrganizationComponent.setActiveOrganization(undefined, id);
        }
        this._router.navigate([event.organizationProfilePath, id]);
      });
    }
  }

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
  async resetNavigation(hideNavigation: boolean) {
    try {
      this._fuseSplashScreenService.show();
      if (this.hideMenusAndButtons !== hideNavigation) {
        this.hideMenusAndButtons = hideNavigation;
        this.onHideMenusAndButtonsChange.emit(this.hideMenusAndButtons);
      }
      if (hideNavigation) {
        this.navigation = [];
      } else {
        await this.loadNavigationItemsFromRoutes();
      }
    } catch (error) {
      this._toastrService.showError(constants.FATAL_ERROR_OCCURED);
      this._sharedHelpers.terminateAllTasksAndLogout([this._unsubscribeAll]);
    } finally {
      setTimeout(() => {
        this._fuseSplashScreenService.hide();
      }, 700);
    }
  }

  async goToMarketPlace() {
    this.marketplace = true;
    localStorage.setItem(constants.MARKET_PLACE, 'true');
    this._router.navigate(['/marketplace']);
  }

  async goToDashboard() {
    this.marketplace = false;
    localStorage.setItem(constants.MARKET_PLACE, 'false');
    this._router.navigate(['/landing-page']);
  }

  /**
   * Stores the url of the module chosen in cookies
   * resets the navigation config to regenerate the links and routes
   * calls resetNavigation to change navigation items, and animate the transition between modules
   *
   * @params url: string
   */
  async onSwitchModule(url: string) {
    localStorage.setItem(constants.CURRENT_MODULE, url);
    await this.resetNavigation(false);
  }

  /**
   * reset the user organization
   * calls resetNavigation to change refresh token, and animate the transition between modules
   *
   * @params organization: Partial<UserOrganizations>
   */
  async onActiveOrganizationChange(organizationId: number) {
    try {
      await this._switchOrganizationsService.switchOrganization(organizationId);
    } catch (error) {
      // Ignore error
    } finally {
      this._fuseSplashScreenService.show();
      setTimeout(() => {
        this._fuseSplashScreenService.hide();
      }, 1000);
    }
  }

  /**
   * Subscribe to media changes, and Check if the screen is small
   */
  private subscribeToMediaChangesAndScreenSizeCheck() {
    this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
      this.isScreenSmall = !matchingAliases.includes('md');
    });
  }

  /**
   * Set the selected module in localStorage, from the url
   * or if already selected, lastely ADMIN as default
   *
   * @returns the selected module
   */
  private setSelectedModule() {
    const urlSegments = this._router.url.split('/').map((segment) => segment.toLocaleUpperCase());
    urlSegments.shift();
    const modules = Object.keys(constants.MODULES_ROUTINGS_URLS);

    if (modules.includes(urlSegments[0])) {
      this.isAppReachedByUrl = true;
      localStorage.setItem(constants.CURRENT_MODULE, urlSegments[0]);
    } else if (!localStorage.getItem(constants.CURRENT_MODULE)) {
      localStorage.setItem(constants.CURRENT_MODULE, constants.MODULES_ROUTINGS_URLS.ADMIN);
      return constants.MODULES_ROUTINGS_URLS.ADMIN;
    }
    return localStorage.getItem(constants.CURRENT_MODULE);
  }

  /**
   * Builds navigation items from application routes
   * based on Selected Organization & Selected Module
   *
   * Returns only Landing Page if no organization selected
   */
  private async loadNavigationItemsFromRoutes() {
    const applicationRoutes = appRoutes[0].children;
    const navigationItems = [applicationRoutes.find(({ path }) => path === constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.LANDING_PAGE)];

    const currentOrganizationId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    try {
      if (currentOrganizationId) {
        const organizationExist = await this._adminOrganizationsService.getOrganization(currentOrganizationId);
        if (organizationExist) {
          const modulePath = localStorage.getItem(constants.CURRENT_MODULE) || constants.MODULES_ROUTINGS_URLS.ADMIN;
          const found = applicationRoutes.find(({ path }) => path.toLocaleLowerCase() === modulePath.toLocaleLowerCase());

          navigationItems.push(found);
        } else {
          localStorage.removeItem(constants.CURRENT_ORGANIZATION_ID);
        }
      }
    } catch (error) {
      if (error.status === 0) {
        this._sharedHelpers.terminateAllTasksAndLogout([this._unsubscribeAll]);
      }
    } finally {
      this.navigation = this.buildNavigationItemsFromRoutes(navigationItems);
      }
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
    if (this.isAppReachedByUrl) {
      setTimeout(() => {
        this.isAppReachedByUrl = false;
      }, 1500);
      return;
    }
    const { path, component, loadChildren, children } = route;
    const redirectToPath = path ? ['/', path] : [''];
    if (!component && !loadChildren && children[0]?.path) {
      redirectToPath.push(children[0].path);
    }
    this._router.navigate(redirectToPath);
  }
}
