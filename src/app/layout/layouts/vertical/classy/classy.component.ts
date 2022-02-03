import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
  FuseNavigationItem,
  FuseNavigationItemTypeEnum,
  FuseNavigationService,
  FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { User } from 'app/core/user/user.types';
import { appRoutes, routesParentPath } from 'app/app.routing';
import { TranslatePipe } from 'app/shared/pipes/transloco.pipe';

@Component({
  selector: 'classy-layout',
  templateUrl: './classy.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
  isScreenSmall: boolean;
  navigation: FuseNavigationItem[];
  user: User;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _translatePipe: TranslatePipe,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fuseNavigationService: FuseNavigationService,
  ) {}

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  ngOnInit(): void {
    // Subscribe to navigation data
    const { children: dashboardsRoutesChildren = [] } = appRoutes.find(({ path }) => path === routesParentPath);
    this.navigation = this.getNavigationItemsFromRoutes(dashboardsRoutesChildren, `/${routesParentPath}`);

    this.user = {
      id: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
      name: 'Brian Hughes',
      email: 'hughes.brian@company.com',
      avatar: 'assets/images/avatars/brian-hughes.jpg',
      status: 'online',
    };

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Check if the screen is small
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
    return routes.map(({ path = '', data, children = [] }) => {
      const { title = path, type = FuseNavigationItemTypeEnum.basic, icon } = data || {};
      const translatedTitle = this._translatePipe.transform(title);
      const id = `${parentPath}.${path}`.replace('/', '');
      const link = `${parentPath ? `${parentPath}` : ''}/${path}`;
      const navigationItem = { id, title: translatedTitle, type, link } as FuseNavigationItem;
      if (children?.length) {
        navigationItem.children = this.getNavigationItemsFromRoutes(children, link);
      }
      if (icon) {
        navigationItem.icon = icon;
      }
      return navigationItem;
    });
  }
}
