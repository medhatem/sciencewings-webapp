import { BehaviorSubject, Observable, map, take } from 'rxjs';

import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  UserInviteToOrgRo,
} from 'generated/models';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
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
    return this._httpClient.get('api/apps/members/all').pipe(
      take(1),
      map((contacts: any) => contacts.find((member) => member.id === 'cd5fa417-b667-482d-b208-798d9da3213c') || null),
    );
  }

  getOrgMembers(id: number): Observable<any> {
    return this.swaggerAPI.organizationRoutesGetUsers({ id });
  }

  createMember(body: UserInviteToOrgRo): Observable<any> {
    return this.swaggerAPI.memberRoutesInviteUserToOrganization({ body });
  }
  updateMember(id: number, body): Observable<any> {
    return this.swaggerAPI.memberRoutesUpdate({ id, body });
  }
  getMember(id: number): Observable<any> {
    return this.swaggerAPI.memberRoutesGetById({ id });
  }
  deleteMember(id: number): Observable<any> {
    return this.swaggerAPI.memberRoutesRemove({ id });
  }


}
