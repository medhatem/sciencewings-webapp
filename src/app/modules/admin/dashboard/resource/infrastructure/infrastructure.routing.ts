import { Route } from '@angular/router';
import { InfrastructureListComponent } from './infrastructure-list/infrastructure-list.component';
import { InfrastructureSettingsComponent } from './infrastructure-settings/infrastructure-settings.component';
import { InfrastructureComponent } from './infrastructure.component';

export const infrastructureRoutes: Route[] = [
  {
    path: '',
    component: InfrastructureComponent,
    children: [
      {
        path: '',
        component: InfrastructureListComponent,
      },
      {
        path: 'infrastructure-settings/:id',
        component: InfrastructureSettingsComponent,
      },
    ],
  },
];
