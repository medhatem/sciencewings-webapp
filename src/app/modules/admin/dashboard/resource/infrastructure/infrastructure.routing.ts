import { Route, Routes } from '@angular/router';
import { InfrastructureResolver } from 'app/modules/admin/resolvers/infrastructure/infrastructure.resolvers';
import { InfrastructureListComponent } from './infrastructure-list/infrastructure-list.component';
import { InfrastructureComponent } from './infrastructure.component';

export const infrastructureRoutes: Route[] = [
  {
    path: '',
    component: InfrastructureListComponent,
  },
];
