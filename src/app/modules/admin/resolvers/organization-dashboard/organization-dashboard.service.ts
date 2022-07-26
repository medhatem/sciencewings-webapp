import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationDashboardService {
  private _data: any;

  constructor(private _httpClient: HttpClient) {}

  get data$(): Observable<any> {
    return this._data.asObservable();
  }

  getProjectData(): Promise<any> {
    return lastValueFrom(this._httpClient.get('api/apps/organization-dashboard/projects'));
  }

  getResourceData(): Promise<any> {
    return lastValueFrom(this._httpClient.get('api/apps/organization-dashboard/resources'));
  }

  getMembershipData(): Promise<any> {
    return lastValueFrom(this._httpClient.get('api/apps/organization-dashboard/memberships'));
  }

  getReservationData(): Promise<any> {
    return lastValueFrom(this._httpClient.get('api/apps/organization-dashboard/reservations'));
  }
}
