import { Route } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project.component';
import { AdminOrganizationResolver } from '../../resolvers/admin-organization/admin-organization.resolvers';

export const projectRoutes: Route[] = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: '',
        component: ProjectListComponent,
        resolve: {
          organization: AdminOrganizationResolver,
        },
      },
    ],
  },
];
