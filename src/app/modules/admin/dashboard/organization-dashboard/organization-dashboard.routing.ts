import { Route } from '@angular/router';
import { OrganizationDashboardComponent } from './organization-dashboard.component';
import { OrganizationDashboardResolver } from '../../resolvers/organization-dashboard/organization-dashboard.resolver';
export const organizationDashboardRoutes: Route[] = [
  {
    path: '',
    component: OrganizationDashboardComponent,
    resolve: {
      dashboardData: OrganizationDashboardResolver,
    },
  },
];
