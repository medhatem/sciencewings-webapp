import { Observable, lastValueFrom, map, BehaviorSubject, tap } from 'rxjs';
import { Organization } from 'app/models/organizations/organization';

import { ApiService } from 'generated/services';
import { CreateOrganizationDto } from 'generated/models/create-organization-dto';
import { Injectable } from '@angular/core';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { UserOrganizations } from 'app/models/organizations/user-organizations';
import { constants } from 'app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AdminOrganizationsService {
  private _userOrganiztions: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private _swaggerService: ApiService, private _toastrService: ToastrService) {}

  get userOrganiztions(): Observable<any> {
    return this._userOrganiztions.asObservable();
  }
  /**
   * get all the organizations the current user is a member of.
   *
   * Returns Observable, because we want all subscribed component to get updated
   * when this endpoint is called.
   *
   * @param userId id of the user
   * @returns Obsevable of an Array of UserOrganizations
   */
  getAllUserOrganizations(userId?: number): Observable<UserOrganizations[]> {
    const id = userId || Number(localStorage.getItem(constants.CURRENT_USER_ID));
    return this._swaggerService.memberRoutesGetUserMemberships({ userId: id }).pipe(
      map((memberships) => memberships.body.data.map((membership) => new UserOrganizations(membership))),
      tap((organizations) => this._userOrganiztions.next(organizations)),
    );
  }

  /**
   * get organization by id
   *
   * @param id id of organization
   * @returns Promise of Organization
   */
  async getOrganization(id: string | number): Promise<Organization> {
    return lastValueFrom(this._swaggerService.organizationRoutesGetById({ id: Number(id) }).pipe(map((data) => new Organization(data))));
  }

  /**
   *
   * @param organization
   * @returns Promise of CreateOrganizationDto
   */
  async createOrganization(organization: Organization): Promise<CreateOrganizationDto> {
    return lastValueFrom(this._swaggerService.organizationRoutesCreateOrganization({ body: organization as any }));
  }

  /**
   * Update organization by id
   *
   * @param id
   * @param body
   * @returns Promise of any
   */
  async updateOrganization(id: number, body: any): Promise<any> {
    return lastValueFrom(this._swaggerService.organizationRoutesUpdateOrganization({ id, body }));
  }

  /**
   * Get organization Settings by id
   *
   * @param id
   * @returns
   */
  getOrganizationSettingsById(id: number): Observable<any> {
    return this._swaggerService.organizationRoutesGetOgranizationSettings({ organizationId: id });
  }

  /**
   * Update organization settings by id
   *
   * @param id
   * @param body
   * @returns
   */
  updateOrganizationsSettingsProperties(id: number, body: any): Observable<any> {
    return this._swaggerService.organizationRoutesUpdateOrganizationsSettingsnAccessProperties({ organizationId: id, body });
  }
}
