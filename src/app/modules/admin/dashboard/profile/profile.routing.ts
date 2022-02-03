import { Route } from '@angular/router';
import { ProfileComponent } from 'app/modules/admin/dashboard/profile/profile.component';
import { ProjectResolver } from 'app/modules/admin/dashboard/profile/profile.resolvers';

export const projectRoutes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    resolve: {
      data: ProjectResolver,
    },
  },
];
