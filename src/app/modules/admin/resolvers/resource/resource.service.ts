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

  getOrgMembers(id: number): Observable<any> {
    return this.swaggerAPI.organizationRoutesGetUsers({ id });
  }
  getOrgResource(id: number): Observable<any> {
    return this.swaggerAPI.organizationRoutesGetOgranizationResources({ organizationId: 1 });
  }
  createResource(body: ResourceRo): Observable<any> {
    return this.swaggerAPI.organizationRoutesCreateResource({ body });
  }
  updateResource(id: number, body: ResourceRo): Observable<any> {
    return this.swaggerAPI.organizationRoutesUpdateResource({ id, body });
  }
  getResource(id: number): Observable<any> {
    return this.swaggerAPI.resourceRoutesGetById({ id });
  }
  deleteResource(id: number): Observable<any> {
    return this.swaggerAPI.resourceRoutesRemove({ id });
  }
  // resource settings
  getResourceSettings(id: number): Observable<any> {
    return this.swaggerAPI.organizationRoutesGetResourceSettings({ id });
  }
  // general
  updateResourceSettingsGeneralStatus(id: number, body: ResourceSettingsGeneralStatusRo): Observable<any> {
    return this.swaggerAPI.organizationRoutesUpdateResourcesSettingsGeneralStatus({ id, body });
  }
  updateResourceSettingsGeneralVisibility(id: number, body: ResourceSettingsGeneralVisibilityRo): Observable<any> {
    return this.swaggerAPI.organizationRoutesUpdateResourcesSettingsGeneralVisibility({ id, body });
  }
  updateResourceSettingsGeneralProperties(id: number, body: ResourceSettingsGeneralPropertiesRo): Observable<any> {
    return this.swaggerAPI.organizationRoutesUpdateResourcesSettingsnGeneralProperties({ id, body });
  }

  // reservation

  createResourceSettingsReservationRate(id: number, body: ResourceRateRo): Observable<any> {
    return this.swaggerAPI.organizationRoutesCreateResourceRate({ id, body });
  }
  updateResourceSettingsReservationRate(id: number, body: ResourceRateRo): Observable<any> {
    return this.swaggerAPI.organizationRoutesUpdateResourceRate({ id, body });
  }
  updateResourcesSettingsReservationGeneral(id: number, body: ResourcesSettingsReservationGeneralRo): Observable<any> {
    return this.swaggerAPI.organizationRoutesUpdateResourcesSettingsReservationGeneral({ id, body });
  }
  updateResourceSettingsReservationUnit(id: number, body: ResourcesSettingsReservationUnitRo): Observable<any> {
    return this.swaggerAPI.organizationRoutesUpdateResourcesSettingsReservationUnit({ id, body });
  }
  updateResourceSettingsReservationTimeRestriction(id: number, body: ResourceTimerRestrictionRo): Observable<any> {
    return this.swaggerAPI.organizationRoutesUpdateResourceTimerRestriction({ id, body });
  }
  updateResourceSettingsReservationVisibility(id: number, body: ResourceReservationVisibilityRo): Observable<any> {
    return this.swaggerAPI.organizationRoutesUpdateResourceRestrictionVisibility({ id, body });
  }
}
