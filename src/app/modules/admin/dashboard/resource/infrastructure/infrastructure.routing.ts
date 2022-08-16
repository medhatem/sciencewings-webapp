import { Route, Routes } from '@angular/router';
import { InfrastructureListComponent } from './infrastructure-list/infrastructure-list.component';
import { InfrastructureComponent } from './infrastructure.component';

export const infrastructureRoutes: Route[] = [
  {
    path: '',
    component: InfrastructureListComponent,
    children: [
      {
        path: '',
        component: InfrastructureListComponent,
      },
    ],
  },
];
