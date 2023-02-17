import { Route } from '@angular/router';
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
    ],
  },
];
