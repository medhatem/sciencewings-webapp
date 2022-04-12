import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationItem, FuseNavigationItemTypeEnum, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { User } from 'app/core/user/user.types';
import { appRoutes, appResourcesRoutes, errorPath, appResourceRoutes } from 'app/app.routing';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'app/data.service';

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
  private message: string;
  private subscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fuseNavigationService: FuseNavigationService,
    private _coookies: CookieService,
    private data: DataService
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
    this.resetNavigation(this.hideMenusAndButtons);
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

    // resource profile
    this.subscription = this.data.currentMessage.subscribe(message => {
        this._coookies.set('url', 'resource');
        this._coookies.set('resourceID', message.resource);
        const { children: dashboardsResourceRoutesChildren = [] } = appResourceRoutes.find(({ path }) => path === '');
        this.navigation = this.getNavigationItemsFromRoutes(dashboardsResourceRoutesChildren, '/');
        this._router.resetConfig(appResourceRoutes);
    });
    this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
      this.isScreenSmall = !matchingAliases.includes('md');
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    this.subscription.unsubscribe();
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
    this.hideMenusAndButtons = hideNavigation;
    this.onHideMenusAndButtonsChange.emit(this.hideMenusAndButtons);
    if (hideNavigation) {
      this.navigation = [];
    } else {
      const url = this._coookies.get('url');
      switch (url) {
        case 'dashboard':
          const { children: dashboardsMainRoutesChildren = [] } = appRoutes.find(({ path }) => path === '');
          this.navigation = this.getNavigationItemsFromRoutes(dashboardsMainRoutesChildren, '/');
          break;
        case 'resources':
          const { children: dashboardsResourcesRoutesChildren = [] } = appResourcesRoutes.find(({ path }) => path === '');
          this.navigation = this.getNavigationItemsFromRoutes(dashboardsResourcesRoutesChildren, '/');
          break;
        default:
          break;
      }
    }
  }

  receiveMessage($event) {
    switch ($event) {
      case 'resources':
        this._coookies.set('url', 'resources');
        this._router.resetConfig(appResourcesRoutes);
        break;
      case 'dashboard':
        this._coookies.set('url', 'dashboard');
        this._router.resetConfig(appRoutes);
        break;
      default:
        this._coookies.set('url', '');
        this._router.resetConfig(appRoutes);
        break;
    }
    this.resetNavigation(false);
  }

  onActiveOrganizationChange(organization: any) {
    // TO DO : do logic to manage organization change
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
      const { title = path, type = FuseNavigationItemTypeEnum.basic, icon } = data || {};
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
}
