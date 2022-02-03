import { Route } from '@angular/router';
import { OrganizationProfileResolver } from '../../resolvers/profile/organization-profile.resolvers';
import { OrganizationProfileComponent } from './organization-profile.component';

export const organizationProfileRoutes: Route[] = [
  {
    path: '',
    component: OrganizationProfileComponent,
    resolve: {
      data: OrganizationProfileResolver,
    },
  },
];
