import { BehaviorSubject, Observable, map, tap, take } from 'rxjs';

import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  InfrastructureRo,
  ResourceRateRo,
  ResourceReservationVisibilityRo,
  ResourceRo,
  ResourceSettingsGeneralPropertiesRo,
  ResourceSettingsGeneralStatusRo,
  ResourceSettingsGeneralVisibilityRo,
  ResourcesSettingsReservationGeneralRo,
  ResourcesSettingsReservationUnitRo,
  ResourceTimerRestrictionRo,
  UpdateinfrastructureRo,
} from 'generated/models';
import moment from 'moment';
import { constants } from 'app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _infrastructures: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient, private swaggerAPI: ApiService) {}

  /**
   * Getter for data
   * k
   */
  get data$(): Observable<any> {
    return this._data.asObservable();
  }
  get pagination$(): Observable<any> {
    return this._pagination.asObservable();
  }
  get infrastructures$(): Observable<any> {
    return this._infrastructures.asObservable();
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
  getInfrastructures(
    page: number = 0,
    size: number = 10,
    sort: string = 'name',
    order: 'asc' | 'desc' | '' = 'asc',
    search: string = '',
  ): Observable<{ pagination: any; infrastructures: any[] }> {
    return this._httpClient
      .get<{ pagination: any; infrastructures: any[] }>('api/apps/ecommerce/inventory/members', {
        params: {
          page: '' + page,
          size: '' + size,
          sort,
          order,
          search,
        },
      })
      .pipe(
        tap((response) => {
          this._pagination.next(response.pagination);
          this._infrastructures.next(response.infrastructures);
        }),
      );
  }

  getOrgMembers(id: number): Observable<any> {
    return this.swaggerAPI.organizationRoutesGetUsers({ id });
  }
  getOrgResource(organizationId: number): Observable<any> {
    return this.swaggerAPI.resourceRoutesGetOgranizationResources({ organizationId });
  }
  createResource(body: ResourceRo): Observable<any> {
    return this.swaggerAPI.resourceRoutesCreateResource({ body });
  }
  updateResource(id: number, body: ResourceRo): Observable<any> {
    return this.swaggerAPI.resourceRoutesUpdateResource({ id, body });
  }
  getResource(id: number): Observable<any> {
    return this.swaggerAPI.resourceRoutesGetById({ id });
  }
  deleteResource(id: number): Observable<any> {
    return this.swaggerAPI.resourceRoutesRemove({ id });
  }
  // resource settings
  getResourceSettings(resourceId: number): Observable<any> {
    return this.swaggerAPI.resourceRoutesGetResourceSettings({ resourceId });
  }
  // general
  updateResourceSettingsGeneralStatus(resourceId: number, body: ResourceSettingsGeneralStatusRo): Observable<any> {
    return this.swaggerAPI.resourceRoutesUpdateResourcesSettingsGeneralStatus({ resourceId, body });
  }
  updateResourceSettingsGeneralVisibility(resourceId: number, body: ResourceSettingsGeneralVisibilityRo): Observable<any> {
    return this.swaggerAPI.resourceRoutesUpdateResourcesSettingsGeneralVisibility({ resourceId, body });
  }
  updateResourceSettingsGeneralProperties(resourceId: number, body: ResourceSettingsGeneralPropertiesRo): Observable<any> {
    return this.swaggerAPI.resourceRoutesUpdateResourcesSettingsnGeneralProperties({ resourceId, body });
  }

  // reservation
  getResourceSettingsReservationRate(resourceId: number): Observable<any> {
    return this.swaggerAPI.resourceRoutesGetResourceRate({ resourceId });
  }
  createResourceSettingsReservationRate(resourceId: number, body: ResourceRateRo): Observable<any> {
    return this.swaggerAPI.resourceRoutesCreateResourceRate({ resourceId, body });
  }
  updateResourceSettingsReservationRate(resourceRateId: number, body: ResourceRateRo): Observable<any> {
    return this.swaggerAPI.resourceRoutesUpdateResourceRate({ resourceRateId, body });
  }
  updateResourcesSettingsReservationGeneral(resourceId: number, body: ResourcesSettingsReservationGeneralRo): Observable<any> {
    return this.swaggerAPI.resourceRoutesUpdateResourcesSettingsReservationGeneral({ resourceId, body });
  }
  updateResourceSettingsReservationUnit(resourceId: number, body: ResourcesSettingsReservationUnitRo): Observable<any> {
    return this.swaggerAPI.resourceRoutesUpdateResourcesSettingsReservationUnit({ resourceId, body });
  }
  updateResourceSettingsReservationTimeRestriction(resourceId: number, body: ResourceTimerRestrictionRo): Observable<any> {
    return this.swaggerAPI.resourceRoutesUpdateResourceTimerRestriction({ resourceId, body });
  }
  updateResourceSettingsReservationVisibility(resourceId: number, body: ResourceReservationVisibilityRo): Observable<any> {
    return this.swaggerAPI.resourceRoutesUpdateResourceRestrictionVisibility({ resourceId, body });
  }
  //Infrastructure
  createInfrastructure(body: InfrastructureRo): Observable<any> {
    return this.swaggerAPI.infrastructureRoutesCreateInfrastructure({ body });
  }
  updateInfrastructure(id: number, body: UpdateinfrastructureRo): Observable<any> {
    return this.swaggerAPI.infrastructureRoutesUpdateinfrastructure({ id, body });
  }
  getInfrastructure(id: number): Observable<any> {
    return this.swaggerAPI.infrastructureRoutesGetById({ id });
  }
  deleteInfrastructure(id: number): Observable<any> {
    return this.swaggerAPI.infrastructureRoutesRemove({ id });
  }
}
