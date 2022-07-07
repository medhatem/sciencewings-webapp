import { AdminOrganizationComponent } from './admin-organization.component';
import { AdminOrganizationResolver } from '../../resolvers/admin-organization/admin-organization.resolvers';
import { OrganizationFormComponent } from './form/organization-form.component';
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
        component: OrganizationFormComponent,
      },
      {
        // TO DO
        // change to path: ':id' , when the change organizations implemented
        path: ':idOrg',
        component: OrganizationProfileComponent,
        resolve: {
          organization: AdminOrganizationResolver,
        },
      },
    ],
  },
];
