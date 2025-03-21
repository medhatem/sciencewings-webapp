import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import {
  organizationsTypes as categoriesData,
  organizations as organizationsData,
} from 'app/mock-api/apps/my-organizations/data';

@Injectable({
  providedIn: 'root',
})
export class MyOrganizationsMockApi {
  private _categories: any[] = categoriesData;
  private _courses: any[] = organizationsData;

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
    // @ Categories - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService.onGet('api/apps/organizations/organizations-categories').reply(() => {
      // Clone the categories
      const categories = cloneDeep(this._categories);

      // Sort the categories alphabetically by title
      categories.sort((a, b) => a.title.localeCompare(b.title));

      return [200, categories];
    });

    // -----------------------------------------------------------------------------------------------------
    // @ Courses - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService.onGet('api/apps/organizations/my-organizations').reply(() => {
      // Clone the courses
      const courses = cloneDeep(this._courses);

      return [200, courses];
    });

    // -----------------------------------------------------------------------------------------------------
    // @ Course - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService.onGet('api/apps/organizations/organization').reply(({ request }) => {
      // Get the id from the params
      const id = request.params.get('id');

      // Clone the courses and steps
      const courses = cloneDeep(this._courses);

      // Find the course and attach steps to it
      const course = courses.find((item) => item.id === id);
      if (course) {
        course.steps = { s: 'steps' };
      }

      return [200, course];
    });
  }
}
