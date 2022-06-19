import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Organization } from 'app/models/organizations/organization';
import { AdminOrganizationsService } from './admin-project.service';

@Injectable({
  providedIn: 'root',
})
export class AdminOrganizationResolver implements Resolve<any> {
  constructor(private _myOrganizationsService: AdminOrganizationsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Organization> {
    const { id } = route.params || route.data || route.queryParams;
    if (id) {
      return this._myOrganizationsService.getOrganization(id);
    }
  }
}
