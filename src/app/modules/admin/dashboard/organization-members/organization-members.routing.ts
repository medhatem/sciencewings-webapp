import { AdminOrganizationResolver } from '../../resolvers/admin-organization/admin-organization.resolvers';
import { MemberProfileComponent } from './member-profil/MemberProfile.component';
import { OrganizationMemebrsComponent } from './organization-members.component';
import { Route } from '@angular/router';
export const organizationMemebrsRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        component: OrganizationMemebrsComponent,
        resolve: {
          data: AdminOrganizationResolver,
        },
      },
      {
        path: 'memberProfile/:idOrg/:userId',
        component: MemberProfileComponent,
      },
    ],
  },
];
