import { AdminOrganizationComponent } from './admin-organization.component';
import { AdminOrganizationResolver } from '../../resolvers/admin-organization/admin-organization.resolvers';
import { OrganizationFormComponent } from './form/organization-form.component';
import { OrganizationFormResolver } from '../../resolvers/admin-organization/organization-form.resolvers';
import { OrganizationProfileComponent } from './profile/organization-profile.component';
import { Route } from '@angular/router';

export const adminOrganizationRoutes: Route[] = [
  {
    path: '',
    component: AdminOrganizationComponent,
    resolve: {},
    children: [
      {
        path: 'create',
        resolve: {
          userOrganizations: OrganizationFormResolver,
        },
        component: OrganizationFormComponent,
      },
      {
        path: ':idOrg',
        component: OrganizationProfileComponent,
        resolve: {
          organization: AdminOrganizationResolver,
        },
      },
    ],
  },
];
