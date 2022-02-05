import { Route } from '@angular/router';
import { MyOrganizationsComponent } from './my-organizations.component';
import { MyOrganizationDetailsComponent } from './details/my-organization-details.component';
import { MyOrganizationsListComponent } from './list/my-organizations-list.component';
import {
  MyOrganizationsDetailResolver,
  MyOrganizationsDetailsResolver,
  MyOrganizationsResolver,
} from '../../resolvers/my-organizations/my-organizations.resolvers';

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
        path: ':id',
        component: MyOrganizationDetailsComponent,
        resolve: {
          organization: MyOrganizationsDetailResolver,
        },
      },
    ],
  },
];
