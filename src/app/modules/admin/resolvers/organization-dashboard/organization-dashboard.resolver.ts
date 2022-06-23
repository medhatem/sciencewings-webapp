import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { OrganizationDashboardService } from './organization-dashboard.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrganizationDashboardProjectResolver implements Resolve<any> {
  constructor(private _organizationDashboardService: OrganizationDashboardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this._organizationDashboardService.getProjectData();
  }
}

@Injectable({
  providedIn: 'root',
})
export class OrganizationDashboardResourceResolver implements Resolve<any> {
  constructor(private _organizationDashboardService: OrganizationDashboardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this._organizationDashboardService.getResourceData();
  }
}
