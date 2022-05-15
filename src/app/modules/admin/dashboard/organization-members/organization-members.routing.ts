import { Route } from '@angular/router';
import { AdminOrganizationResolver } from '../../resolvers/admin-organization/admin-organization.resolvers';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberProfilComponent } from './member-profil/member-profil.component';
import { OrganizationMemebrsyComponent } from './organization-members.component';
export const organizationMemebrsRoutes: Route[] = [
  {
    path: '',
    component: OrganizationMemebrsyComponent,
    resolve: {
      data: AdminOrganizationResolver,
    },
    children: [
      {
        // TO DO
        // change to path: ':id' , when the change organizations implemented
        path: '',
        component: MemberListComponent,
        resolve: {
          organization: AdminOrganizationResolver,
        },
      },
      {
        path: 'create',
        component: MemberProfilComponent,
      },
    ],
  },
];
