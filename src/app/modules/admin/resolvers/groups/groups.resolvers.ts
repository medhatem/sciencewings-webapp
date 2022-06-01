import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupService } from './groups.service';

@Injectable({
  providedIn: 'root',
})
export class GroupResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _profileService: GroupService) {}

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
