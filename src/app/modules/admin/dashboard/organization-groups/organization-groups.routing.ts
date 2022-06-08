import { Route } from '@angular/router';
import { AdminOrganizationResolver } from '../../resolvers/admin-organization/admin-organization.resolvers';
import { GroupListComponent } from './group-list/group-list.component';
import { OrganizationGroupsComponent } from './organization-groups.component';
export const organizationGroupsRoutes: Route[] = [
  {
    path: '',
    component: OrganizationGroupsComponent,
    resolve: {
      data: AdminOrganizationResolver,
    },
    children: [
      {
        path: '',
        component: GroupListComponent,
        resolve: {
          organization: AdminOrganizationResolver,
        },
      },
    ],
  },
];
