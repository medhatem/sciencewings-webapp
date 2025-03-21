import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import {
  recentProjects as recentProjectsData,
  recentResources as recentResourcesData,
  recentMemberships as recentMembershipsData,
  recentReservations as recentReservationsData,
} from 'app/mock-api/apps/organization-dashboard/data';
@Injectable({
  providedIn: 'root',
})
export class OrganizationDashboardMockApi {
  private _recentProjects: any = recentProjectsData;
  private _recentResources: any = recentResourcesData;
  private _recentMemberships: any = recentMembershipsData;
  private _recentReservations: any = recentReservationsData;

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
    this._fuseMockApiService.onGet('api/apps/organization-dashboard/projects').reply(() => [200, cloneDeep(this._recentProjects)]);
    this._fuseMockApiService.onGet('api/apps/organization-dashboard/resources').reply(() => [200, cloneDeep(this._recentResources)]);
    this._fuseMockApiService.onGet('api/apps/organization-dashboard/memberships').reply(() => [200, cloneDeep(this._recentMemberships)]);
    this._fuseMockApiService.onGet('api/apps/organization-dashboard/reservations').reply(() => [200, cloneDeep(this._recentReservations)]);
  }
}
