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
import { constants } from './shared/constants';

/**
 * App Routing
 * contains all the routes that are passed to the app router
 * using lazy loading on main routes
 */
export const appRoutes: Route[] = [
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
        path: constants.MODULES_ROUTINGS_URLS.ADMIN,
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.ADMIN.TITLE',
          type: FuseNavigationItemTypeEnum.group,
        },
        children: [
          {
            path: constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.LANDING_PAGE,
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.LANDING_PAGE.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:users',
            },
            loadChildren: () => import('app/modules/admin/dashboard/landing-page/landing-page.module').then((m) => m.LandingPageModule),
          },
          {
            path: constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.ORGANIZATION_PROFILE,
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
            path: constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.ORGANIZATION_MEMBERS,
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
            path: constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.ORGANIZATION_GROUPS,
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
          {
            path: constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.ORGANIZATION_SETTINGS,
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
        ],
      },
      {
        path: constants.MODULES_ROUTINGS_URLS.RESOURCES,
        canActivate: [AuthGuard],
        data: {
          title: 'APP.ROUTES.ADMIN.RESOURCE.TITLE',
          type: FuseNavigationItemTypeEnum.group,
        },
        children: [
          {
            path: constants.MODULES_ROUTINGS_CHILDREN_URLS.RESOURCES.RESOURCE,
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.RESOURCE.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:cube',
            },
            loadChildren: () => import('app/modules/admin/dashboard/resource/resource.module').then((m) => m.ResourceModule),
          },
          {
            path: constants.MODULES_ROUTINGS_CHILDREN_URLS.RESOURCES.RESOURCE_UPDATE,
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.RESOURCE_PROFILE.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:information-circle',
            },
            component: ResourceProfileFormComponent,
          },
          {
            path: 'project',
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.PROJECT.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:table',
            },
            resolve: {
              projects: ProjectResolver,
            },
            loadChildren: () => import('app/modules/admin/dashboard/project/project.module').then((m) => m.ProjectModule),
          },
          {
            path: constants.MODULES_ROUTINGS_CHILDREN_URLS.RESOURCES.SCHEDULE,
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.RESOURCE_SCHEDULE.TITLE',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:calendar',
            },
            component: ResourceScheduleComponent,
          },
          {
            path: constants.MODULES_ROUTINGS_CHILDREN_URLS.RESOURCES.GENERAL_SETTINGS,
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
            path: constants.MODULES_ROUTINGS_CHILDREN_URLS.RESOURCES.RESERVATION_SETTINGS,
            canActivate: [AuthGuard],
            data: {
              title: 'APP.ROUTES.ADMIN.RESOURCE_SETTINGS.RESERVATION',
              type: FuseNavigationItemTypeEnum.basic,
              icon: 'heroicons_outline:users',
            },
            loadChildren: () =>
              import('app/modules/admin/dashboard/resource/resource-settings/reservation/settings.module').then(
                (m) => m.SettingsReservationModule,
              ),
          },
        ],
      },
      {
        path: constants.MODULES_ROUTINGS_URLS.ERROR_PAGE,
        pathMatch: 'full',
        loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then((m) => m.Error404Module),
      },
    ],
  },
];
