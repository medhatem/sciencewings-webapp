import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberService } from './member.service';

@Injectable({
  providedIn: 'root',
})
export class MemberResolver implements Resolve<any> {
  constructor(private _memberService: MemberService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._memberService.getMembers();
  }
}
