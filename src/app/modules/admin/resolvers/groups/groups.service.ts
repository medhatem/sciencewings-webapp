import { BehaviorSubject, Observable, tap, lastValueFrom, map } from 'rxjs';
import { ApiService } from 'generated/services';
import { Injectable } from '@angular/core';
import { GroupDto } from 'generated/models';
import { Group, GroupBody } from 'app/models/groups/group';
import { constants } from 'app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _groups: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _paginatedGroups: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private swaggerAPI: ApiService) {}

  get pagination$(): Observable<any> {
    return this._pagination.asObservable();
  }

  get groups$(): Observable<any> {
    return this._groups.asObservable();
  }

  get paginatedGroups$(): Observable<any> {
    return this._paginatedGroups.asObservable();
  }

  getAndParseOrganizationGroups(page: number = 0, size: number = 5, query?: string) {
    return this.getGroups(page, size, query || null).pipe(
      map(({ body }) => {
        const { data, pagination } = body;
        const groups = data.map((groupDirty) => {
          const { id, name, active, members } = new GroupBody(groupDirty);
          return {
            name,
            status: active ? 'Active' : 'Inactive',
            members,
            parent: '',
            id,
          };
        });
        return { groups, pagination };
      }),
      tap(({ groups, pagination }) => {
        this._paginatedGroups.next(groups);
        this._pagination.next(pagination);
      }),
    );
  }

  getGroups(page?: number, size?: number, query?: string): Observable<any> {
    const organizationId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));

    if (page || size || query) {
      return this.swaggerAPI.groupRoutesGetOrganizationGroup({ organizationId, page, size, query });
    } else {
      return this.swaggerAPI.groupRoutesGetOrganizationGroup({ organizationId });
    }
  }

  async createGroup(group: Group): Promise<GroupDto> {
    return await lastValueFrom(this.swaggerAPI.groupRoutesCreateGroup({ body: group }));
  }

  async getGroupsByOrgId(organizationId: number): Promise<Group[]> {
    return lastValueFrom(
      this.swaggerAPI
        .groupRoutesGetOrganizationGroup({ organizationId })
        .pipe(map((result: any) => result.body.data.map((group: any) => new Group(group)))),
    );
  }

  /**
   * TODO: Preserve to when implementing pagnation
   */
  // getGroups(
  //   page: number = 0,
  //   size: number = 10,
  //   sort: string = 'name',
  //   order: 'asc' | 'desc' | '' = 'asc',
  //   search: string = '',
  // ): Observable<{ pagination: any; groups: any[] }> {
  //   return this._httpClient
  //     .get<{ pagination: any; groups: any[] }>('api/apps/ecommerce/inventory/groups', {
  //       params: {
  //         page: '' + page,
  //         size: '' + size,
  //         sort,
  //         order,
  //         search,
  //       },
  //     })
  //     .pipe(
  //       tap((response) => {
  //         this._pagination.next(response.pagination);
  //         this._groups.next(response.groups);
  //       }),
  //     );
  // }
}
