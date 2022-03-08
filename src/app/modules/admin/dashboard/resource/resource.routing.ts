import { ResourceComponent } from './resource.component';
import { ResourceProfileFormComponent } from './profile-form/profile-form.component';
import { ResourceResolver } from '../../resolvers/resource/resource.resolvers';
import { Route } from '@angular/router';

export const resourceRoutes: Route[] = [
  {
    path: '',
    component: ResourceComponent,
    resolve: {
      data: ResourceResolver,
    },
    children: [
      {
        path: '',
        component: ResourceComponent,
        resolve: {
            resource: ResourceResolver,
        },
      }
    ],
  },
];
