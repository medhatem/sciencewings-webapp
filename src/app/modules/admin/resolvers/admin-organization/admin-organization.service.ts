import { lastValueFrom, map, Observable } from 'rxjs';

import { ApiService } from 'generated/services';
import { Injectable } from '@angular/core';
import { Organization, UserOrganizations } from 'app/models/organizations/organization';
import { OrganizationDto } from 'generated/models';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AdminOrganizationsService {
  constructor(private _swaggerService: ApiService, private _toastrService: ToastrService) {}

  async getOrganization(id: string | number): Promise<Organization> {
    return lastValueFrom(this._swaggerService.organizationRoutesGetById({ id: Number(id) }).pipe(map((data) => new Organization(data))));
  }

  async createOrganization(organization: Organization): Promise<OrganizationDto> {
    return lastValueFrom(this._swaggerService.organizationRoutesCreateOrganization({ body: organization as any }));
  }

  async getUserOrganizations(userId: number): Promise<UserOrganizations[]> {
    return lastValueFrom(
      this._swaggerService
        .organizationRoutesGetUserOrganizations({ id: userId })
        .pipe(map(({ body }) => body.organizations.map((organization) => new UserOrganizations(organization)))),
    );
  }

  async updateOrganization(id: number, body: any): Promise<any> {
    return lastValueFrom(this._swaggerService.organizationRoutesUpdateOrganization({ id, body }));
  }

  getOrganizationSettingsById(id: number): Observable<any> {
    return;
    // return this._swaggerService.organizationRoutesGetOgranizationSettings({ id });
  }

  updateOrganizationsSettingsProperties(id: number, body: any): Observable<any> {
    return;
    // return this._swaggerService.organizationRoutesUpdateOrganizationsSettingsnAccessProperties({ id, body });
  }
}
