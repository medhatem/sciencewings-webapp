import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { User } from 'app/core/user/user.types';

@Component({
  selector: 'classy-layout',
  templateUrl: './classy.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
  isScreenSmall: boolean;
  navigation: { default: any };
  user: User;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
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
    this.navigation = {
      default: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          subtitle: 'Unique dashboard designs',
          type: 'group',
          icon: 'heroicons_outline:home',
          children: [
            {
              id: 'dashboard.profile',
              title: 'Profile',
              type: 'basic',
              icon: 'heroicons_outline:user',
              link: '/dashboard/profile',
            },
            {
              id: 'dashboard.project',
              title: 'project',
              type: 'basic',
              icon: 'heroicons_outline:collection',
              link: '/dashboard/project',
            },
            {
              id: 'dashboard.calendar',
              title: 'calendar',
              type: 'basic',
              icon: 'heroicons_outline:calendar',
              link: '/dashboard/calendar',
            },
          ],
        },
      ],
    };

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
}
