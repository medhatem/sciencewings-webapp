import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OrganizationUsersService } from './organization-users.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationUsersResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _organizationUsersService: OrganizationUsersService) {}

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
    return this._organizationUsersService.getData();
  }
}
