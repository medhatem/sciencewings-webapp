import { Route } from '@angular/router';
import { InfrastructureResolver } from 'app/modules/admin/resolvers/infrastructure/infrastructure.resolvers';
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
        resolve: {
          infrastructures: InfrastructureResolver,
        },
      },
      {
        path: 'infrastructure-settings/:id',
        component: InfrastructureSettingsComponent,
      },
    ],
  },
];
