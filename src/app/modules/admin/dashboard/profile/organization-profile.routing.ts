import { Route } from '@angular/router';
import { OrganizationProfileComponent } from 'app/modules/admin/dashboard/profile/organization-profile.component';
import { OrganizationProfileResolver } from 'app/modules/admin/resolvers/profile/organization-profile.resolvers';

export const OrganizationProfileRoutes: Route[] = [
  {
    path: '',
    component: OrganizationProfileComponent,
    resolve: {
      data: OrganizationProfileResolver,
    },
  },
];
