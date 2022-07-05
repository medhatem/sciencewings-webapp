import { AdminOrganizationComponent } from './admin-organization.component';
import { AdminOrganizationResolver } from '../../resolvers/admin-organization/admin-organization.resolvers';
import { OrganizationFormComponent } from './form/organization-form.component';
import { OrganizationProfileComponent } from './profile/organization-profile.component';
import { Route } from '@angular/router';

export const adminOrganizationRoutes: Route[] = [
  {
    path: '',
    component: AdminOrganizationComponent,
    resolve: {
      data: AdminOrganizationResolver,
    },
    children: [
      {
        // TO DO
        // change to path: ':id' , when the change organizations implemented
        path: ':id',
        component: OrganizationProfileComponent,
        resolve: {
          organization: AdminOrganizationResolver,
        },
      },
      {
        path: 'create',
        component: OrganizationFormComponent,
      },
    ],
  },
];
