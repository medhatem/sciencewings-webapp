import { Route } from '@angular/router';
import { AdminOrganizationResolver } from '../../resolvers/admin-organization/admin-organization.resolvers';
import { OrganizationSettingsComponent } from './organization-settings.component';

export const organizationSettingsRoutes: Route[] = [
  {
    path: '',
    component: OrganizationSettingsComponent,
    resolve: {
      data: AdminOrganizationResolver,
    },
  },
];
