import { BehaviorSubject, Observable, map, tap, lastValueFrom } from 'rxjs';

import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateInfrastructureDto, MemberDto, UpdateinfrastructureRo } from 'generated/models';
import moment from 'moment';
import { constants } from 'app/shared/constants';
import { Infrastructure, InfrastructureListItem } from 'app/models/infrastructures/infrastructure';

@Injectable({
  providedIn: 'root',
})
export class InfrastructureService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _infrastructures: BehaviorSubject<any | null> = new BehaviorSubject(null);

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

  getOrgInfrastructures(): Observable<any> {
    const orgId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    return this.swaggerAPI.infrastructureRoutesGetAllInfrastructuresOfAgivenOrganization({ orgId });
  }

  getAndParseOrganizationInfrastructures(): Observable<any[]> {
    return this.getOrgInfrastructures().pipe(
      map((infrastructures) => infrastructures.body.data.map((infrastructure) => new InfrastructureListItem(infrastructure))),

      map((infrastructures: InfrastructureListItem[]) =>
        infrastructures.map(({ name, key, id, responsible, resourcesNb, dateStart }) => ({
          name: `${name}`,
          key,
          resourcesNb: `${resourcesNb}`,
          responsible: this.parseInfrastructureResponsible(responsible),
          dateStart: moment(dateStart).format(constants.DATE_FORMAT_YYYY_MM_DD),
          id: id,
        })),
      ),
      tap((response) => {
        this._infrastructures.next(response);
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
}
