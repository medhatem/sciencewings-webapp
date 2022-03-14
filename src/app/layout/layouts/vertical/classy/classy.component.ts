import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
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
import { appRoutes, appResourceRoutes, errorPath } from 'app/app.routing';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    @Input() hideMenusAndButtons = false;
    isScreenSmall: boolean;
    navigation: FuseNavigationItem[];
    user: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
    ) { }

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    ngOnInit(): void {
        const { userData } = this._route.snapshot.data;
        this.resetNavigation(this.hideMenusAndButtons);
        // Subscribe to navigation data
        this.user = {
            ...userData,
            // Add fake data for test
            // To Remove and use only userData
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

    /**
     * Hide/Show navigation
     *
     * @param hideNavigation
     */
    resetNavigation(hideNavigation: boolean, url: string = '') {
        this.hideMenusAndButtons = hideNavigation;
        if (hideNavigation) {
            this.navigation = [];
        } else {
            switch (url) {
                case '':
                    const { children: dashboardsMainRoutesChildren = [] } = appRoutes.find(({ path }) => path === '');
                    this.navigation = this.getNavigationItemsFromRoutes(dashboardsMainRoutesChildren, '/');
                    break;
                case 'resources':
                    const { children: dashboardsResourceRoutesChildren = [] } = appResourceRoutes.find(({ path }) => path === '');
                    this.navigation = this.getNavigationItemsFromRoutes(dashboardsResourceRoutesChildren, '/resource');
                    break;
                default:
                    break;
            }

        }
    }

    receiveMessage($event) {
        this.resetNavigation(false, $event);
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
