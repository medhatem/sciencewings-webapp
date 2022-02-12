import { Route } from '@angular/router';
import { OrganizationUsersResolver } from '../../resolvers/users/organization-users.resolvers';
import { OrganizationUsersComponent } from './organization-users.component';

export const organizationUsersRoutes: Route[] = [
  {
    path: '',
    component: OrganizationUsersComponent,
    resolve: {
      data: OrganizationUsersResolver,
    },
  },
];
