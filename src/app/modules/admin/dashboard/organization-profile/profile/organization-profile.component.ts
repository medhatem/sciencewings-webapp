import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { Organization } from 'app/models/organizations/organization';
import { Subject } from 'rxjs';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { Address } from 'app/models';

export interface InventoryPagination {
  length: number;
  size: number;
  page: number;
  lastPage?: number;
  startIndex?: number;
  endIndex?: number;
}

@Component({
  selector: 'organization-profile',
  templateUrl: 'organization-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationProfileComponent implements OnInit, OnDestroy {
  readonly organizationProfilePath = `/${constants.MODULES_ROUTINGS_URLS.ADMIN}/${constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.ORGANIZATION_SETTINGS}`;
  readonly fullCreateOrganizationPath = this.organizationProfilePath;

  profile: Organization;

  pagination: InventoryPagination = {
    length: 5,
    size: 5,
    page: 2,
  };

  organization: Organization;
  phoneNumber: string;
  adress: string;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _adminOrganizationsService: AdminOrganizationsService,
    private _route: ActivatedRoute,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  /**
   * On init
   */

  async ngOnInit(): Promise<void> {
    this.organization = await this.fetchOrganizationInformation();
    this.adress = this.formatAddress(this.organization.addresses[0]);
    this.phoneNumber = this.organization.phone?.phoneNumber || null;
    this._changeDetectorRef.markForCheck();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
   * Prepare the chart data from the data
   *
   * @private
   */

  private async fetchOrganizationInformation() {
    const { idOrg } = this._route.snapshot.params;
    if (!Number(idOrg)) {
      this._toastrService.showError(constants.WRONG_ORG_ID);
    }
    return this.fetchOrganization(idOrg);
  }

  private async fetchOrganization(id: number) {
    try {
      return this._adminOrganizationsService.getOrganization(id);
    } catch (error) {
      this._toastrService.showError(constants.FETCH_ORGANIZATION_FAILED);
    }
  }

  private formatAddress(address: Address): string {
    const { apartment = '', street = '', city = '', province = '', country = '', code = '', type = '' } = address;
    const addressWithoutApp = `${street}, ${city}, ${province}, ${country}, ${code} | ${type}`;
    return apartment ? `${apartment}, ${addressWithoutApp}` : addressWithoutApp;
  }
}
