import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from './core/auth/keycloak/app.guard';
import { FuseNavigationItemTypeEnum } from '@fuse/components/navigation/navigation.types';

export const routesParentPath = 'dashboards';
export const appRoutes: Route[] = [
  // Redirect empty path to '/dashboard/profile'
  { path: '', pathMatch: 'full', redirectTo: 'dashboards' },

  // Redirect signed in user to the '/dashboard/profile'
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboards' },

  // dashboard routes
  {
    path: routesParentPath,
    canActivate: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: 'admin',
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.ORGANIZATION.TITLE',
          type: FuseNavigationItemTypeEnum.group,
        },
        children: [
          {
            path: 'profile',
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ORGANIZATION.PROFILE.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:office-building',
            },
            loadChildren: () =>
              import('app/modules/organization/dashboard/profile/organization-profile.module').then(
                (m) => m.OrganizationProfileModule,
              ),
          },
        ],
      },
      {
        path: 'user',
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.USER.TITLE',
          type: FuseNavigationItemTypeEnum.group,
        },
        children: [
          {
            path: 'profile',
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.USER.PROFILE.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:user',
            },
            loadChildren: () =>
              import('app/modules/user/dashboard/profile/user-profile.module').then((m) => m.UserProfileModule),
          },
        ],
      },
      {
        path: 'menu',
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.MENU.TITLE',
          type: FuseNavigationItemTypeEnum.group,
        },
        children: [
          {
            path: 'calendar',
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.MENU.CALENDAR.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:calendar',
            },
            loadChildren: () =>
              import('app/modules/menu/dashboard/calendar/calendar.module').then((m) => m.MenuCalendarModule),
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '404-not-found' },
];
