import { lastValueFrom, map } from 'rxjs';

import { ApiService } from 'generated/services';
import { Injectable } from '@angular/core';
import { Organization } from 'app/models/organizations/organization';

@Injectable({
  providedIn: 'root',
})
export class AdminOrganizationsService {
  constructor(private _swaggerService: ApiService) {}

  async getOrganization(id: string | number): Promise<Organization> {
    return lastValueFrom(this._swaggerService.organizationRoutesGetById({id:Number(id)}).pipe(map((data) => new Organization(data))));
  }

  async createOrganization(organization: Organization): Promise<boolean> {
    return lastValueFrom(this._swaggerService.organizationRoutesCreateOrganization({body:organization as any})).then(() => true);
  }
}
