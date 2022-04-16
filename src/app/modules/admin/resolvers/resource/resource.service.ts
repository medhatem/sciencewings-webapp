import { BehaviorSubject, Observable, map, take } from 'rxjs';

import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ResourceRateRo,
  ResourceReservationVisibilityRo,
  ResourceRo,
  ResourceSettingsGeneralPropertiesRo,
  ResourceSettingsGeneralStatusRo,
  ResourceSettingsGeneralVisibilityRo,
  ResourcesSettingsReservationGeneralRo,
  ResourcesSettingsReservationUnitRo,
  ResourceTimerRestrictionRo,
} from 'generated/models';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient, private swaggerAPI: ApiService) {}

  /**
   * Getter for data
   * k
   */
  get data$(): Observable<any> {
    return this._data.asObservable();
  }

  /**
   * Get data
   */
  getData(id?: string): Observable<any> {
    return this._httpClient.get('api/apps/resources/all').pipe(
      take(1),
      map((contacts: any) => contacts.find((res) => res.id === 'cd5fa417-b667-482d-b208-798d9da3213c') || null),
    );
  }

  getOrgMembers(id?: number): Observable<any> {
    return this._httpClient.get('http://localhost:3000/organization/getMembers/'+id);
  }
  getOrgResource(id?: string): Observable<any> {
    return this._httpClient.get('http://localhost:3000/organization/resources/getOgranizationResourcesById/1');
  }
  createResource(payload: ResourceRo): Observable<any> {
    return this._httpClient.post('http://localhost:3000/organization/resources/create', payload);
  }
  updateResource(id: number, payload: ResourceRo): Observable<any> {
    return this._httpClient.put('http://localhost:3000/organization/resources/update/' + id, payload);
  }
  getResource(id?: number): Observable<any> {
    return this._httpClient.get('http://localhost:3000/resources/getById/' + id);
  }
  deleteResource(id?: number): Observable<any> {
    return this._httpClient.delete('http://localhost:3000/resources/' + id);
  }
  // resource settings
  getResourceSettings(id?: number): Observable<any> {
    return this._httpClient.get('http://localhost:3000/organization/resources/settings/' + id);
  }
  // general
  updateResourceSettingsGeneralStatus(id: number, payload: ResourceSettingsGeneralStatusRo): Observable<any> {
    return this._httpClient.put('http://localhost:3000/organization/resources/settings/general/status/' + id, payload);
  }
  updateResourceSettingsGeneralVisibility(id: number, payload: ResourceSettingsGeneralVisibilityRo): Observable<any> {
    return this._httpClient.put('http://localhost:3000/organization/resources/settings/general/visibility/' + id, payload);
  }
  updateResourceSettingsGeneralProperties(id: number, payload: ResourceSettingsGeneralPropertiesRo): Observable<any> {
    return this._httpClient.put('http://localhost:3000/organization/resources/settings/general/properties/' + id, payload);
  }

  // reservation
  getResourceSettingsReservationRate(id: number): Observable<any> {
    return this._httpClient.get('http://localhost:3000/organization/resources/settings/reservation/rate/' + id);
  }
  createResourceSettingsReservationRate(id: number, payload: ResourceRateRo): Observable<any> {
    return this._httpClient.post('http://localhost:3000/organization/resources/settings/reservation/rate/' + id, payload);
  }
  updateResourceSettingsReservationRate(id: number, payload: ResourceRateRo): Observable<any> {
    return this._httpClient.put('http://localhost:3000/organization/resources/settings/reservation/rate/' + id, payload);
  }
  updateResourcesSettingsReservationGeneral(id: number, payload: ResourcesSettingsReservationGeneralRo): Observable<any> {
    return this._httpClient.put('http://localhost:3000/organization/resources/settings/reservation/general/' + id, payload);
  }
  updateResourceSettingsReservationUnit(id: number, payload: ResourcesSettingsReservationUnitRo): Observable<any> {
    return this._httpClient.put('http://localhost:3000/organization/resources/settings/reservation/unit/' + id, payload);
  }
  updateResourceSettingsReservationTimeRestriction(id: number, payload: ResourceTimerRestrictionRo): Observable<any> {
    return this._httpClient.put('http://localhost:3000/organization/resources/settings/reservation/time_restriction/' + id, payload);
  }
  updateResourceSettingsReservationVisibility(id: number, payload: ResourceReservationVisibilityRo): Observable<any> {
    return this._httpClient.put('http://localhost:3000/organization/resources/settings/reservation/visibility/' + id, payload);
  }
}
