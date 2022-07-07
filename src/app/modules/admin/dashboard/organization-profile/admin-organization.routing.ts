import { Route } from '@angular/router';
import { AdminOrganizationResolver } from '../../resolvers/admin-organization/admin-organization.resolvers';
import { OrganizationFormResolver } from '../../resolvers/admin-organization/organization-form.resolvers';
import { AdminOrganizationComponent } from './admin-organization.component';
import { OrganizationFormComponent } from './form/organization-form.component';
import { OrganizationProfileComponent } from './profile/organization-profile.component';

export const adminOrganizationRoutes: Route[] = [
  {
    path: '',
    component: AdminOrganizationComponent,
    children: [
      {
        path: '',
        component: OrganizationProfileComponent,
        resolve: {
          organization: AdminOrganizationResolver,
        },
      },
      {
        path: 'create',
        component: OrganizationFormComponent,
        resolve: {
          userOrganizations: OrganizationFormResolver,
        },
      },
    ],
  },
];
