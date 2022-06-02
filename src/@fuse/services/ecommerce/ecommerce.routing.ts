import { Route } from '@angular/router';
import {
  InventoryBrandsResolver,
  InventoryCategoriesResolver,
  InventoryProductsResolver,
  InventoryTagsResolver,
  InventoryVendorsResolver,
} from './inventory/inventory.resolvers';
import { InventoryListComponent } from './inventory/list/inventory.component';
import { InventoryComponent } from './inventory/inventory.component';
export const ecommerceRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inventory',
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    children: [
      {
        path: '',
        component: InventoryListComponent,
        resolve: {
          brands: InventoryBrandsResolver,
          categories: InventoryCategoriesResolver,
          products: InventoryProductsResolver,
          tags: InventoryTagsResolver,
          vendors: InventoryVendorsResolver,
        },
      },
    ],
    /*children : [
            {
                path     : '',
                component: ContactsListComponent,
                resolve  : {
                    tasks    : ContactsResolver,
                    countries: ContactsCountriesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : ContactsDetailsComponent,
                        resolve      : {
                            task     : ContactsContactResolver,
                            countries: ContactsCountriesResolver
                        },
                        canDeactivate: [CanDeactivateContactsDetails]
                    }
                ]
            }
        ]*/
  },
];
