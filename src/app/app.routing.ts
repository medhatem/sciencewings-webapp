import { AuthGuard } from './core/auth/keycloak/app.guard';
import { FuseNavigationItemTypeEnum } from '@fuse/components/navigation/navigation.types';
import { InitialDataResolver } from 'app/app.resolvers';
import { LayoutComponent } from 'app/layout/layout.component';
import { NewUserInfosResolver } from './layout/new-user-infos/new-user-infos.resolver';
import { Route } from '@angular/router';
import { ResourceComponent } from './modules/admin/dashboard/resource/resource.component';
import { ResourceScheduleComponent } from './modules/admin/dashboard/resource/schedule/schedule.component';

export const errorPath = '**';
export const appRoutes: Route[] = [
  // dashboard routes
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
      userData: NewUserInfosResolver,
    },
    children: [
      {
        path: 'admin',
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.ADMIN.TITLE',
          type: FuseNavigationItemTypeEnum.group,
        },
        children: [
          {
            path: 'organization-profile',
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.ORGANIZATION_PROFILE.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:office-building',
            },
            loadChildren: () =>
              import('app/modules/admin/dashboard/organization-profile/admin-organization.module').then((m) => m.AdminOrganizationModule),
          },
          {
            path: 'user-profile',
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.USER_PROFILE.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:user',
            },
            loadChildren: () => import('app/modules/admin/dashboard/user-profile/user-profile.module').then((m) => m.UserProfileModule),
          },
          {
            path: 'users',
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.ORGANIZATION_MEMBERS.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:users',
            },
            loadChildren: () => import('app/modules/admin/dashboard/users/organization-users.module').then((m) => m.OrganizationUsersModule),
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
            loadChildren: () => import('app/modules/menu/dashboard/calendar/calendar.module').then((m) => m.MenuCalendarModule),
          },
        ],
      },
      {
        path: errorPath,
        pathMatch: 'full',
        loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then((m) => m.Error404Module),
      },
    ],
  },
];
export const appResourceRoutes: Route[] = [
  // resource routes
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
      userData: NewUserInfosResolver,
    },
    children: [
      {
        path: 'resources',
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.ADMIN.TITLE',
          type: FuseNavigationItemTypeEnum.group,
        },
        children: [
          {
            path: 'resource',
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.RESOURCE.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:cube',
            },
            loadChildren: () => import('app/modules/admin/dashboard/resource/resource.module').then((m) => m.ResourceModule),
          },
          {
            path: 'schedule',
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.RESOURCE_SCHEDULE.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:cube',
            },
             component: ResourceScheduleComponent,
            //loadChildren: () => import('app/modules/admin/dashboard/resource/resource.module').then((m) => m.ResourceModule),
          },
          // {
          //     path: 'resource/list',
          //     canActivate: [AuthGuard],
          //     data: {
          //         title: 'APP.ROUTES.ADMIN.RESOURCE_LIST.TITLE',
          //         type: FuseNavigationItemTypeEnum.basic,
          //         icon: 'heroicons_outline:cube',
          //     },
          //     loadChildren: () =>
          //         import('app/modules/admin/dashboard/resource/resource.module').then(
          //             (m) => m.ResourceModule,
          //         ),
          // },
        ],
      },
      {
        path: errorPath,
        pathMatch: 'full',
        loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then((m) => m.Error404Module),
      },
    ],
  },
];
