import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { OrganizationUsersService } from './organization-users.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationUsersResolver implements Resolve<any> {
  constructor(private _organizationUsersService: OrganizationUsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    const { id } = route.queryParams;
    return this._organizationUsersService.getData(id);
  }
}
