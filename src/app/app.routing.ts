import { AuthGuard } from './core/auth/keycloak/app.guard';
import { FuseNavigationItemTypeEnum } from '@fuse/components/navigation/navigation.types';
import { InitialDataResolver } from 'app/app.resolvers';
import { LayoutComponent } from 'app/layout/layout.component';
import { NewUserInfosResolver } from './layout/new-user-infos/new-user-infos.resolver';
import { Route } from '@angular/router';
import { ResourceScheduleComponent } from './modules/admin/dashboard/resource/schedule/schedule.component';
import { ResourceProfileFormComponent } from './modules/admin/dashboard/resource/profile-form/profile-form.component';
import { GroupResolver } from './modules/admin/resolvers/groups/groups.resolvers';
import { ProjectResolver } from './modules/admin/resolvers/project/project.resolvers';

export const errorPath = '**';
export const adminPath = 'admin';
export const userProfilePath = 'user-profile';
export const voidRoutes: Route[] = [];
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
        path: '',
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.ADMIN.LANDING_PAGE.TITLE',
          type: FuseNavigationItemTypeEnum.basic,
          icon: 'heroicons_outline:home',
        },
        loadChildren: () => import('app/modules/admin/dashboard/landing-page/landing-page.module').then((m) => m.LandingPageModule),
      },
      {
        path: adminPath,
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.ADMIN.TITLE',
          type: FuseNavigationItemTypeEnum.group,
        },
        children: [
          {
            path: 'landing-page',
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.LANDING_PAGE.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:users',
            },
            loadChildren: () => import('app/modules/admin/dashboard/landing-page/landing-page.module').then((m) => m.LandingPageModule),
          },
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
            path: 'organization-settings',
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.ORGANIZATION_PROFILE.SETTINGS',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:adjustments',
            },
            loadChildren: () =>
              import('app/modules/admin/dashboard/organization-settings/organization-settings.module').then(
                (m) => m.OrganizationSettingsModule,
              ),
          },
          {
            path: userProfilePath,
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.USER_PROFILE.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:user',
            },
            loadChildren: () => import('app/modules/admin/dashboard/user-profile/user-profile.module').then((m) => m.UserProfileModule),
          },
          {
            path: 'organization-members',
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.ORGANIZATION_MEMBERS.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:user',
            },
            resolve: {},
            loadChildren: () =>
              import('app/modules/admin/dashboard/organization-members/organization-members.module').then((m) => m.OrganizationMembersModule),
          },
          {
            path: 'organization-groups',
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.ORGANIZATION_GROUPS.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:users',
            },
            resolve: {
              groups: GroupResolver,
            },
            loadChildren: () =>
              import('app/modules/admin/dashboard/organization-groups/organization-groups.module').then((m) => m.OrganizationGroupsModule),
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
        path: 'resource/update',
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.ADMIN.RESOURCE_PROFILE.TITLE',
          type: FuseNavigationItemTypeEnum.basic,
          icon: 'heroicons_outline:information-circle',
        },
        component: ResourceProfileFormComponent,
      },
      {
        path: 'schedule',
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.ADMIN.RESOURCE_SCHEDULE.TITLE',
          type: FuseNavigationItemTypeEnum.basic,
          icon: 'heroicons_outline:calendar',
        },
        component: ResourceScheduleComponent,
      },
      {
        path: 'settings-general',
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.ADMIN.RESOURCE_SETTINGS.GENERAL',
          type: FuseNavigationItemTypeEnum.basic,
          icon: 'heroicons_outline:users',
        },
        loadChildren: () =>
          import('app/modules/admin/dashboard/resource/resource-settings/general/settings.module').then((m) => m.SettingsGeneralModule),
      },
      {
        path: 'settings-reservation',
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.ADMIN.RESOURCE_SETTINGS.RESERVATION',
          type: FuseNavigationItemTypeEnum.basic,
          icon: 'heroicons_outline:users',
        },
        loadChildren: () =>
          import('app/modules/admin/dashboard/resource/resource-settings/reservation/settings.module').then((m) => m.SettingsReservationModule),
      },
    ],
  },
];

export const appResourceSettingsRoutes: Route[] = [
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
        path: '',
        redirectTo: 'resource',
        pathMatch: 'full',
        data: {
          title: 'Back',
          type: FuseNavigationItemTypeEnum.basic,
          icon: 'heroicons_outline:arrow-circle-left',
          action: 'resources',
        },
      },
      {
        path: 'settings-general',
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.ADMIN.RESOURCE_SETTINGS.GENERAL',
          type: FuseNavigationItemTypeEnum.basic,
          icon: 'heroicons_outline:users',
        },
        loadChildren: () =>
          import('app/modules/admin/dashboard/resource/resource-settings/general/settings.module').then((m) => m.SettingsGeneralModule),
      },
      {
        path: 'settings-reservation',
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.ADMIN.RESOURCE_SETTINGS.RESERVATION',
          type: FuseNavigationItemTypeEnum.basic,
          icon: 'heroicons_outline:users',
        },
        loadChildren: () =>
          import('app/modules/admin/dashboard/resource/resource-settings/reservation/settings.module').then((m) => m.SettingsReservationModule),
      },
    ],
  },
];
