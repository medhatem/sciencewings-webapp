import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import {
  brands as brandsData,
  categories as categoriesData,
  products as productsData,
  tags as tagsData,
  vendors as vendorsData,
} from 'app/mock-api/apps/ecommerce/inventory/data';

@Injectable({
  providedIn: 'root',
})
export class ProjectMockApi {
  private _categories: any[] = categoriesData;
  private _brands: any[] = brandsData;
  private _products: any[] = productsData;
  private _tags: any[] = tagsData;
  private _vendors: any[] = vendorsData;

  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ Products - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService.onGet('api/apps/dashboard/projects', 300).reply(({ request }) => {
      // Get available queries
      const search = request.params.get('search');
      const sort = request.params.get('sort') || 'name';
      const order = request.params.get('order') || 'asc';
      const page = parseInt(request.params.get('page') ?? '1', 10);
      const size = parseInt(request.params.get('size') ?? '10', 10);

      // Clone the products
      let products: any[] | null = [
        { name: 'getsion', responsible: 'Abdelbasset', members: 3, date: 'April 29, 2022', avatar: '' },
        { name: 'tesla', responsible: 'nasro', members: 3, date: 'April 29, 2022', avatar: '' },
        { name: 'Twitter', responsible: 'hatem', members: 3, date: 'April 29, 2022', avatar: '' },
        { name: 'Sciencewings', responsible: 'abdesslam', members: 3, date: 'April 29, 2022', avatar: '' },
        { name: 'Develop', responsible: 'amine', members: 3, date: 'April 29, 2022', avatar: '' },
        { name: 'Humaine Resources', responsible: 'mohamed', members: 3, date: 'April 29, 2022', avatar: '' },
        { name: 'Humaine Resources', responsible: 'mohamed', members: 3, date: 'April 29, 2022', avatar: '' },
        { name: 'Humaine Resources', responsible: 'mohamed', members: 3, date: 'April 29, 2022', avatar: '' },
        { name: 'Humaine Resources', responsible: 'mohamed', members: 3, date: 'April 29, 2022', avatar: '' },
        { name: 'Humaine Resources', responsible: 'mohamed', members: 3, date: 'April 29, 2022', avatar: '' },
        { name: 'Humaine Resources', responsible: 'mohamed', members: 3, date: 'April 29, 2022', avatar: '' },
        { name: 'Humaine Resources', responsible: 'mohamed', members: 3, date: 'April 29, 2022', avatar: '' },
        { name: 'Humaine Resources', responsible: 'mohamed', members: 3, date: 'April 29, 2022', avatar: '' },
        { name: 'Humaine Resources', responsible: 'mohamed', members: 3, date: 'April 29, 2022', avatar: '' },
        { name: 'Humaine Resources', responsible: 'mohamed', members: 3, date: 'April 29, 2022', avatar: '' },
      ];

      // Sort the products
      if (sort === 'responsible' || sort === 'name' || sort === 'active') {
        products.sort((a, b) => {
          const fieldA = a[sort].toString().toUpperCase();
          const fieldB = b[sort].toString().toUpperCase();
          return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
        });
      } else {
        products.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));
      }

      // If search exists...
      if (search) {
        // Filter the products
        products = products.filter((contact) => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
      }

      // Paginate - Start
      const productsLength = products.length;

      // Calculate pagination details
      const begin = page * size;
      const end = Math.min(size * (page + 1), productsLength);
      const lastPage = Math.max(Math.ceil(productsLength / size), 1);

      // Prepare the pagination object
      let pagination = {};

      // If the requested page number is bigger than
      // the last possible page number, return null for
      // products but also send the last possible page so
      // the app can navigate to there
      if (page > lastPage) {
        products = null;
        pagination = {
          lastPage,
        };
      } else {
        // Paginate the results by size
        products = products.slice(begin, end);

        // Prepare the pagination mock-api
        pagination = {
          length: productsLength,
          size: size,
          page: page,
          lastPage: lastPage,
          startIndex: begin,
          endIndex: end - 1,
        };
      }

      // Return the response
      return [
        200,
        {
          projects: products,
          pagination,
        },
      ];
    });
  }
}
