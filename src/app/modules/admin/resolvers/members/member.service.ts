import { BehaviorSubject, Observable, map, take, tap, lastValueFrom } from 'rxjs';

import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'app/models/Member';
import { UserInviteToOrgRo } from 'generated/models';
import { constants } from 'app/shared/constants';
import moment from 'moment';
import { OrganizationMembers } from 'app/models/members/member';
import { Pagination } from 'app/models/pagination/IPagination';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private _members: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient, private swaggerAPI: ApiService) {}

  get data$(): Observable<any> {
    return this._data.asObservable();
  }

  get pagination$(): Observable<any> {
    return this._pagination.asObservable();
  }

  get members$(): Observable<any> {
    return this._members.asObservable();
  }

  getData(id?: string): Observable<any> {
    return this._httpClient.get('api/apps/members/all').pipe(
      take(1),
      map((contacts: any) => contacts.find((member) => member.id === 'cd5fa417-b667-482d-b208-798d9da3213c') || null),
    );
  }

  getMembers(
    page: number = 0,
    size: number = 10,
    sort: string = 'name',
    order: 'asc' | 'desc' | '' = 'asc',
    search: string = '',
  ): Observable<{ pagination: any; members: any[] }> {
    return this._httpClient
      .get<{ pagination: any; members: any[] }>('api/apps/ecommerce/inventory/members', {
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
          this._members.next(response.members);
        }),
      );
  }

  getOrgMembers(orgID?: number, page: number = 0, size: number = 10): Observable<any> {
    const id = orgID || Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    return this.swaggerAPI.organizationRoutesGetUsers({ id, page, size });
  }

  async getMembersByOrgId(id?: number): Promise<OrganizationMembers[]> {
    return lastValueFrom(
      this.swaggerAPI.organizationRoutesGetUsers({ id }).pipe(map(({ body }) => body.data.map((member) => new OrganizationMembers(member)))),
    );
  }

  getAndParseOrganizationMember(id?: number, page?: number, size?: number): Observable<any> {
    return this.getOrgMembers(id, page, size).pipe(
      map((result) => {
        const members = result.body.data
          .map((member) => new Member(member))
          .map((m: Member): any => ({
            role: 'Member',
            profile: `${m.name}<br>
                              ${m.workEmail}`,
            status: m.status,
            date: moment(m.joinDate).format(constants.DATE_FORMAT_YYYY_MM_DD),
            ...m,
          }));
        return { members, pagination: result.body.pagination };
      }),
      tap((response) => {
        this._members.next(response.members);
        this._pagination.next(response.pagination);
      }),
    );
  }

  getMemberPagination(id?: number, page?: number, size?: number): Observable<any> {
    return this.getOrgMembers(id, page, size).pipe(
      map((p) => new Pagination(p.body.pagination)),
      tap((response) => {
        this._pagination.next(response);
      }),
    );
  }

  inviteUserToOrganization(organizationId: number, email: string): Observable<any> {
    return this.swaggerAPI.memberRoutesInviteUserToOrganization({ body: { organizationId, email } });
  }

  createMember(body: UserInviteToOrgRo): Observable<any> {
    return this.swaggerAPI.memberRoutesInviteUserToOrganization({ body });
  }

  updateMember(orgId: number, userId: number, body): Observable<any> {
    return this.swaggerAPI.memberRoutesUpdateMember({ orgId, userId, body });
  }

  getMember(orgId: number, userId: number): Observable<any> {
    return this.swaggerAPI.memberRoutesGetMemberProfile({ orgId, userId });
  }

  deleteMember(id: number): Observable<any> {
    return this.swaggerAPI.memberRoutesRemove({ id });
  }
}
