import { AdminOrganizationResolver } from '../../resolvers/admin-organization/admin-organization.resolvers';
import { OrganizationGroupsComponent } from './organization-groups.component';
import { Route } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupResolver } from '../../resolvers/groups/groups.resolvers';

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
          groups: GroupResolver,
        },
      },
    ],
  },
];
