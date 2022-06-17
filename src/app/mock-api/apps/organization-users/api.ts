import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { orgs as orgsData } from 'app/mock-api/apps/organization-users/data';

@Injectable({
  providedIn: 'root',
})
export class OrganizationUsersMockApi {
  private _orgs: any = orgsData;

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
    // @ Sales - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService.onGet('api/apps/organization-users/users').reply(() => [200, cloneDeep(this._orgs)]);
  }
}
