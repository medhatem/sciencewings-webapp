import { ResourceComponent } from './resource.component';
import { ResourceProfileFormComponent } from './resource-form/profile-form.component';
import { ResourceResolver } from '../../resolvers/resource/resource.resolvers';
import { Route } from '@angular/router';
import { ResourceListComponent } from './resource-list-componenet/resource-list.component';

export const resourceRoutes: Route[] = [
  {
    path: '',
    component: ResourceComponent,
    children: [
      {
        path: '',
        component: ResourceListComponent,
        resolve: {
          data: ResourceResolver,
        },
      },
      {
        path: 'create/:id',
        component: ResourceProfileFormComponent,
      },
    ],
  },
];
