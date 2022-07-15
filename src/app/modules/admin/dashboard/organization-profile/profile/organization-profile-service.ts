import { lastValueFrom, map } from 'rxjs';

import { ApiService } from 'generated/services';
import { Injectable } from '@angular/core';
import { Organization } from 'app/models/organizations/organization';
import { UserOrganizations } from 'app/models/organizations/user-organizations';

@Injectable({
  providedIn: 'root',
})
export class OrganizationProfileService {
  constructor(private _swaggerService: ApiService) {}

  async getOrganization(id: number) {
    return lastValueFrom(
      this._swaggerService
        .organizationRoutesGetById({ id })
        .pipe(map((organization) => new Organization((organization.body as any).data[0] || {}))),
    );
  }
}
