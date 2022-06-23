import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationDashboardService {
  constructor(private _httpClient: HttpClient) {}

  getProjectData(): Promise<any> {
    return lastValueFrom(this._httpClient.get('api/apps/organization-dashboard/projects'));
  }

  getResourceData(): Promise<any> {
    return lastValueFrom(this._httpClient.get('api/apps/organization-dashboard/resources'));
  }
}
