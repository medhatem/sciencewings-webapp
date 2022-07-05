import { lastValueFrom, map } from 'rxjs';

import { ApiService } from 'generated/services';
import { Injectable } from '@angular/core';
import { UserOrganizations } from 'app/models/organizations/user-organizations';

@Injectable({
  providedIn: 'root',
})
export class SwitchOrganizationsService {
  constructor(private _swaggerService: ApiService) {}

  /**
   * get all the organizations the current user is a member of
   *
   * @param userId id of the user
   */
  getAllUserOrganizations(userId: number): Promise<UserOrganizations[]> {
    return lastValueFrom(
      this._swaggerService
        .memberRoutesGetUserMemberships({ userId })
        .pipe(map((memberships) => memberships.body.data.map((membership) => new UserOrganizations(membership)))),
    );
  }
  /**
   * switch the organization of the current user by setting its id as an attribute
   *
   * @param organizationId
   */
  switchOrganization(organizationId: number): void {
    lastValueFrom(this._swaggerService.memberRoutesSwitchOrganization({ orgId: organizationId }));
  }
}
