import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Organization } from 'app/models/organizations/organization';
import { Subject } from 'rxjs';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';

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

  organization: Partial<Organization> = { phones: [], addresses: [] };
  phoneNumber: any;
  adress: any;

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
    this.phoneNumber = this.organization.phones[0].phoneNumber;
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
}
