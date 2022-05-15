import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberService } from './member.service';


@Injectable({
  providedIn: 'root',
})
export class MemberResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _profileService: MemberService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._profileService.getData();
  }
}
