import { Route } from '@angular/router';
import { MyOrganizationsComponent } from './my-organizations.component';
import { MyOrganizationsListComponent } from './list/my-organizations-list.component';
import {
  MyOrganizationsDetailsResolver,
  MyOrganizationsResolver,
  OrganizationFormResolver,
} from '../../resolvers/my-organizations/my-organizations.resolvers';
import { OrganizationProfileComponent } from '../profile/organization-profile.component';
import { OrganizationProfileResolver } from '../../resolvers/profile/organization-profile.resolvers';
import { OrganizationFormComponent } from './form/organization-form.component';

export const myOrganizationsRoutes: Route[] = [
  {
    path: '',
    component: MyOrganizationsComponent,
    resolve: {
      organizationTypes: MyOrganizationsResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MyOrganizationsListComponent,
        resolve: {
          organizations: MyOrganizationsDetailsResolver,
        },
      },
      {
        path: 'create',
        component: OrganizationFormComponent,
      },
      {
        path: ':id',
        component: OrganizationProfileComponent,
        resolve: {
          organization: OrganizationProfileResolver,
        },
      },
    ],
  },
];
