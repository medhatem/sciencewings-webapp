import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { UserOrganizations } from 'app/models/organizations/user-organizations';
import { lastValueFrom } from 'rxjs';
import { AdminOrganizationsService } from './admin-organization.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationFormResolver implements Resolve<UserOrganizations[]> {
  constructor(private _adminOrganizationsService: AdminOrganizationsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UserOrganizations[]> {
    return lastValueFrom(this._adminOrganizationsService.getAllUserOrganizations());
  }
}
