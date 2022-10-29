import { BehaviorSubject, Observable, map, tap, take, lastValueFrom } from 'rxjs';

import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateResourceDto,
  GetAllInfrastructuresDto,
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
import { Resource, ResourceListItem, UpdateResource } from 'app/models/resources/resource';
import { constants } from 'app/shared/constants';
import moment from 'moment';
import { Infrastructure } from 'app/models/infrastructures/infrastructure';
@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private _resources: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _resourcesPaginated: BehaviorSubject<any | null> = new BehaviorSubject(null);

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

  get resources$(): Observable<any> {
    return this._resources.asObservable();
  }

  get resourcesPaginated$(): Observable<any> {
    return this._resourcesPaginated.asObservable();
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

  getAndParseOrganizationResource(page: number = 0, size: number = 5) {
    return this.getOrgResource(page, size).pipe(
      map(({ body }) => {
        const { data, pagination } = body;
        const resources = data.map((resourceDirty) => {
          const { name, resourceClass, resourceType, infrastructures, dateStart } = new ResourceListItem(resourceDirty);
          return {
            name: `${name}`,
            resourceClass,
            infrastructures: 'None',
            resourceType,
            dateStart: moment(dateStart).format(constants.DATE_FORMAT_YYYY_MM_DD),
          };
        });
        return { resources, pagination };
      }),
      tap(({ resources, pagination }) => {
        this._resourcesPaginated.next(resources);
        this._pagination.next(pagination);
      }),
    );
  }

  getOrgResource(page?: number, size?: number): Observable<any> {
    const organizationId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    if (page | size) {
      return this.swaggerAPI.resourceRoutesGetOgranizationResources({ organizationId, page, size });
    } else {
      return this.swaggerAPI.resourceRoutesGetOgranizationResources({ organizationId });
    }
  }

  getOrgMembers(id: number): Observable<any> {
    return this.swaggerAPI.organizationRoutesGetUsers({ id });
  }

  createResource(resource: Resource): Promise<CreateResourceDto> {
    return lastValueFrom(this.swaggerAPI.resourceRoutesCreateResource({ body: resource as any }));
  }
  updateResource(id: number, body: UpdateResource): Observable<any> {
    return this.swaggerAPI.resourceRoutesUpdateResource({ id, body });
  }
  getResource(id: number): Observable<any> {
    return this.swaggerAPI.resourceRoutesGetById({ id });
  }
  getResourceInfrastructure(orgId: number): Observable<GetAllInfrastructuresDto> {
    return this.swaggerAPI.infrastructureRoutesGetAllOrganizationInfrastructures({ orgId });
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
  private parseInfrastructuresToHtml(infrastructures: Infrastructure[]) {
    return infrastructures.map(({ name }) => `<div>${name}</div>`);
  }
}
