import { map, lastValueFrom } from 'rxjs';

import { ApiService } from 'generated/services';
import { CreateOrganizationRO } from 'generated/models/create-organization-ro';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from 'app/models/organizations/organization';

@Injectable({
  providedIn: 'root',
})
export class AdminOrganizationsService {
  constructor(private _swaggerService: ApiService) {}

  async getOrganization(id: string | number): Promise<Organization> {
    return lastValueFrom(this._swaggerService.OrganizationRoutesGetById(Number(id)).pipe(map((data) => new Organization(data))));
  }

  async createOrganization(organization: Organization): Promise<boolean> {
    return lastValueFrom(this._swaggerService.OrganizationRoutesCreateOrganization(organization)).then(() => true);
  }
}
