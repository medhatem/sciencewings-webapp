import { Route } from '@angular/router';
import { ProfileComponent } from 'app/modules/admin/dashboards/profile/profile.component';
import { ProjectResolver } from 'app/modules/admin/dashboards/profile/profile.resolvers';

export const projectRoutes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    resolve: {
      data: ProjectResolver,
    },
  },
];
