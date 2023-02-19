import { Route } from '@angular/router';
import { ResourceScheduleComponent } from '../admin/dashboard/resource/schedule/schedule.component';
import { ResourceResolver } from '../admin/resolvers/resource/resource.resolvers';
import { MarketplaceListComponent } from './marketplace-list/marketplace-list.component';
import { MarketplaceComponent } from './marketplace.component';

export const marketplaceRoutes: Route[] = [
  {
    path: '',
    component: MarketplaceComponent,
    children: [
      {
        path: '',
        component: MarketplaceListComponent,
      },
      {
        path: 'schedule/:id',
        component: ResourceScheduleComponent,
      },
    ],
  },
];
