import { lastValueFrom } from 'rxjs';
import { ApiService } from 'generated/services';
import { Injectable } from '@angular/core';

export enum FunctionReturnTypeEnum {
  promise = 'Promise',
  observable = 'Observable',
}

@Injectable({
  providedIn: 'root',
})
export class SwitchOrganizationsService {
  constructor(private _swaggerService: ApiService) {}

  /**
   * switch the organization of the current user by setting its id as an attribute
   *
   * @param organizationId
   */
  switchOrganization(organizationId: number): void {
    lastValueFrom(this._swaggerService.memberRoutesSwitchOrganization({ orgId: organizationId }));
  }
}
