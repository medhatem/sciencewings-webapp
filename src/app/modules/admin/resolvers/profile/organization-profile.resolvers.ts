import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OrganizationProfileService } from './organization-profile.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationProfileResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _profileService: OrganizationProfileService) {}

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
    const { id } = route.queryParams;
    return;
    // To Do
    return this._profileService.getData(id);
  }
}
