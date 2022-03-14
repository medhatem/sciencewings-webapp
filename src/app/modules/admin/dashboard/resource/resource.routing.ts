import { ResourceComponent } from './resource.component';
import { ResourceProfileFormComponent } from './profile-form/profile-form.component';
import { ResourceScheduleComponent } from './schedule/schedule.component';
import { ResourceResolver } from '../../resolvers/resource/resource.resolvers';
import { Route } from '@angular/router';

export const resourceRoutes: Route[] = [
  {
    path: '',
    component: ResourceComponent,
    resolve: {
      data: ResourceResolver,
    },
  },
  {
    path: ':id',
    component: ResourceProfileFormComponent,
    resolve: {
      data: ResourceResolver,
    },
  },
  {
    path: 'create',
    component: ResourceProfileFormComponent,
    resolve: {
      data: ResourceResolver,
    },
  },
  {
    path: 'schedule',
    component: ResourceScheduleComponent,
    resolve: {
      data: ResourceResolver,
    },
  },
];
