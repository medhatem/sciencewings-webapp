import { Route } from '@angular/router';
import { OrganizationDashboardComponent } from './organization-dashboard.component';
import {
  OrganizationDashboardProjectResolver,
  OrganizationDashboardResourceResolver,
} from '../../resolvers/organization-dashboard/organization-dashboard.resolver';
export const organizationDashboardRoutes: Route[] = [
  {
    path: '',
    component: OrganizationDashboardComponent,
    resolve: {
      projectData: OrganizationDashboardProjectResolver,
      resourceData: OrganizationDashboardResourceResolver,
    },
  },
];
