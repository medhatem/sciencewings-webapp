import { ResourceResolver } from '../../resolvers/resource/resource.resolvers';
import { Route } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project.component';

export const projectRoutes: Route[] = [
  {
    path: '',
    component: ProjectComponent,
    resolve: {
      data: ResourceResolver,
    },
    children: [
      {
        path: '',
        component: ProjectListComponent,
      },
    ],
  },
];
