import { Route } from '@angular/router';
import { AdminOrganizationResolver } from '../../resolvers/admin-organization/admin-organization.resolvers';
import { MemberListComponent } from './member-list/member-list.component';
import { OrganizationMemebrsComponent } from './organization-members.component';
export const organizationMemebrsRoutes: Route[] = [
  {
    path: '',
    component: OrganizationMemebrsComponent,
    resolve: {
      data: AdminOrganizationResolver,
    },
    children: [
      {
        path: '',
        component: MemberListComponent,
        resolve: {
          organization: AdminOrganizationResolver,
        },
      },
    ],
  },
];
