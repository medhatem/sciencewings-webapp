import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { OrganizationDashboardService } from './organization-dashboard.service';

export interface IOrganizationDashboard {
  resources: [];
  projects: [];
}

@Injectable({
  providedIn: 'root',
})
export class OrganizationDashboardResolver implements Resolve<IOrganizationDashboard> {
  constructor(private _organizationDashboardService: OrganizationDashboardService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IOrganizationDashboard> {
    return {
      resources: await this._organizationDashboardService.getResourceData(),
      projects: await this._organizationDashboardService.getProjectData(),
    };
  }
}
