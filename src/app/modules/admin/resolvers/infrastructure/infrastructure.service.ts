import { BehaviorSubject, Observable, map, tap, lastValueFrom } from 'rxjs';

import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  CreateInfrastructureDto,
  InfrastructureStatusObjectDto,
  MemberDto,
  ResourceDto,
  SubInfraObjectDto,
  UpdateinfrastructureRo,
} from 'generated/models';
import moment from 'moment';
import { constants } from 'app/shared/constants';
import { Infrastructure, InfrastructureListItem, ResourcesList, SubInfrastructureList } from 'app/models/infrastructures/infrastructure';

@Injectable({
  providedIn: 'root',
})
export class InfrastructureService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _infrastructures: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _infrastructureSubInfrastructures: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _infrastructureResources: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _infrastructurePaginated: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient, private swaggerAPI: ApiService) {}

  get data$(): Observable<any> {
    return this._data.asObservable();
  }

  get pagination$(): Observable<any> {
    return this._pagination.asObservable();
  }

  get infrastructures$(): Observable<any> {
    return this._infrastructures.asObservable();
  }

  get infrastructurePaginated$(): Observable<any> {
    return this._infrastructurePaginated.asObservable();
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

  async createInfrastructure(infrastructure: Infrastructure): Promise<CreateInfrastructureDto> {
    return lastValueFrom(this.swaggerAPI.infrastructureRoutesCreateInfrastructure({ body: infrastructure as any }));
  }

  getOrgInfrastructures(page?: number, size?: number, query?: string): Observable<any> {
    const orgId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    if (query) {
      return this.swaggerAPI.infrastructureRoutesGetAllInfrastructuresOfAgivenOrganization({ orgId, page, size, query });
    } else if (page || size) {
      return this.swaggerAPI.infrastructureRoutesGetAllInfrastructuresOfAgivenOrganization({ orgId, page, size });
    } else {
      return this.swaggerAPI.infrastructureRoutesGetAllInfrastructuresOfAgivenOrganization({ orgId });
    }
  }
  getInfrastructureResources(infraId?: number): Observable<any> {
    const id = infraId || Number(localStorage.getItem(constants.CURRENT_INFRASTRUCTURE_ID));
    return this.swaggerAPI.infrastructureRoutesGetAllRessourcesOfAgivenInfrastructure({ id });
  }
  getInfrastructureSubInfrastructures(infraId?: number): Observable<any> {
    const id = infraId || Number(localStorage.getItem(constants.CURRENT_INFRASTRUCTURE_ID));
    return this.swaggerAPI.infrastructureRoutesGetAllSubInfasOfAGivenInfrastructure({ id });
  }

  getAndParseInfrastructureSubInfrastructures(infraId?: number): Observable<any[]> {
    const id = infraId || Number(localStorage.getItem(constants.CURRENT_INFRASTRUCTURE_ID));
    return this.getInfrastructureSubInfrastructures(id).pipe(
      map((subInfrastructures) => subInfrastructures.body.data.map((subInfras) => new SubInfrastructureList(subInfras))),
      map((subInfrastructures) =>
        subInfrastructures.map(({ subInfrastructure, resourcesNb, createdAt }) => ({
          subInfrastructure: this?.parseInfrastructureSubInfrastructure(subInfrastructure),
          resourcesNb: `${resourcesNb}`,
          createdAt: moment(createdAt).format(constants.DATE_FORMAT_YYYY_MM_DD),
        })),
      ),
      tap((response) => {
        this._infrastructureSubInfrastructures.next(response);
      }),
    );
  }

  getAndParseInfrastructureResources(infraId?: number): Observable<any[]> {
    const id = infraId || Number(localStorage.getItem(constants.CURRENT_INFRASTRUCTURE_ID));
    return this.getInfrastructureResources(id).pipe(
      map((resources) => resources.body.data.map((resource) => new ResourcesList(resource))),
      map((resources: ResourcesList[]) =>
        resources.map(({ name, status, createdAt }) => ({
          name: `${name}`,
          status: this?.parsInfrastructureStatus(status),
          createdAt: moment(createdAt).format(constants.DATE_FORMAT_YYYY_MM_DD),
        })),
      ),
      tap((response) => {
        this._infrastructureResources.next(response);
      }),
    );
  }

  getAndParseOrganizationInfrastructures(page: number = 0, size: number = 5, query?: string) {
    return this.getOrgInfrastructures(page, size, query || null).pipe(
      map(({ body }) => {
        const { data, pagination } = body;
        const infrastructures = data.map((infrastructureDirty) => {
          const { name, key, id, responsible, resourcesNb, dateStart } = new InfrastructureListItem(infrastructureDirty);
          return {
            name: `${name}`,
            key,
            resourcesNb: `${resourcesNb}`,
            responsible: this.parseInfrastructureResponsible(responsible),
            dateStart: moment(dateStart).format(constants.DATE_FORMAT_YYYY_MM_DD),
            id,
          };
        });
        return { infrastructures, pagination };
      }),
      tap(({ infrastructures, pagination }) => {
        this._infrastructurePaginated.next(infrastructures);
        this._pagination.next(pagination);
      }),
    );
  }

  updateInfrastructure(id: number, body: UpdateinfrastructureRo): Observable<any> {
    return this.swaggerAPI.infrastructureRoutesUpdateinfrastructure({ id, body });
  }

  getInfrastructure(id: number): Observable<any> {
    return this.swaggerAPI.infrastructureRoutesGetInfrastructureById({ id });
  }

  deleteInfrastructure(id: number): Observable<any> {
    return this.swaggerAPI.infrastructureRoutesRemove({ id });
  }

  parseInfrastructureResponsible(responsible: MemberDto): string {
    return `<div>${responsible?.name}</div><div>${(responsible as any)?.workEmail}</div>`;
  }

  parseInfrastructureSubInfrastructure(subInfrastructure: SubInfraObjectDto): string {
    return `<div>${subInfrastructure?.name}</div>`;
  }
  parseInfrastructureResources(resource: ResourceDto): string {
    return `<div>${resource.name}</div>`;
  }

  parsInfrastructureStatus(status: InfrastructureStatusObjectDto) {
    return `<div>${status?.statusType}</div>`;
  }
}
