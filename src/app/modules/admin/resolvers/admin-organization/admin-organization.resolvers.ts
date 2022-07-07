import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { AdminOrganizationsService } from './admin-organization.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminOrganizationResolver implements Resolve<any> {
  constructor(private _myOrganizationsService: AdminOrganizationsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {}
}
