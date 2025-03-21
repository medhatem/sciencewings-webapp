import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { AdminOrganizationsService } from './admin-organization.service';
import { Injectable } from '@angular/core';
import { MemberService } from '../members/member.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminOrganizationResolver implements Resolve<any> {
  constructor(private _myOrganizationsService: AdminOrganizationsService, private _memberService: MemberService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this._memberService.getAndParseOrganizationMember();
  }
}
