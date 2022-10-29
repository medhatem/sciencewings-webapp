import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberService } from './member.service';
import { constants } from 'app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class MemberResolver implements Resolve<any> {
  constructor(private _memberService: MemberService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    return this._memberService.getAndParseOrganizationMember(id);
  }
}
