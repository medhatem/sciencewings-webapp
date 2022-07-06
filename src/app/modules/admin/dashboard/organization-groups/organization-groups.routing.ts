import { AdminOrganizationResolver } from '../../resolvers/admin-organization/admin-organization.resolvers';
import { OrganizationGroupsComponent } from './organization-groups.component';
import { Route } from '@angular/router';
export const organizationGroupsRoutes: Route[] = [
  {
    path: '',
    component: OrganizationGroupsComponent,
    resolve: {
      data: AdminOrganizationResolver,
    },
    children: [],
  },
];
