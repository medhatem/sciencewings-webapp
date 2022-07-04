import { lastValueFrom, map } from 'rxjs';

import { ApiService } from 'generated/services';
import { Injectable } from '@angular/core';
import { UserOrganizations } from 'app/models/organizations/user-organizations';

@Injectable({
  providedIn: 'root',
})
export class SwitchOrganizationsService {
  constructor(private _swaggerService: ApiService) {}

  getAllUserOrganizations(userId: number): Promise<UserOrganizations[]> {
    return lastValueFrom(
      this._swaggerService
        .memberRoutesGetUserMemberships({ userId })
        .pipe(map((memberships) => memberships.body.data.map((membership) => new UserOrganizations(membership)))),
    );
  }
}
