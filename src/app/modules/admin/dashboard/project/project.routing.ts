import { Route } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project.component';
import { AdminOrganizationResolver } from '../../resolvers/admin-organization/admin-organization.resolvers';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { AddMemberToProjectComponent } from './add-member-to-project/add-member-to-project.component';

export const projectRoutes: Route[] = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: '',
        component: ProjectListComponent,
      },
      {
        path: 'project-settings',
        component: ProjectSettingsComponent,
      },
      {
        path: 'add-member-to-project',
        component: AddMemberToProjectComponent,
      },
    ],
  },
];
