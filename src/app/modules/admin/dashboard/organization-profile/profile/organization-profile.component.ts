import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Organization } from 'app/models/organizations/organization';
import { lastValueFrom, Subject } from 'rxjs';
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
  profile: Organization;

  pagination: InventoryPagination = {
    length: 5,
    size: 5,
    page: 2,
  };

  organization: Partial<Organization> = { phones: [], addresses: [] };
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _adminOrganizationsService: AdminOrganizationsService,
    private _route: ActivatedRoute,
    private _toastrService: ToastrService,
    private _cdr: ChangeDetectorRef,
  ) {}

  /**
   * On init
   */
  async ngOnInit(): Promise<void> {
    await this.fetchOrganizationInformation();
    this._prepareChartData();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  getFormattedAddress(address: any) {
    //TODO : create a pipe out of this function
    const { apart = '', streetNumber = '', street = '', country = '', province = '', postalCode = '' } = address || {};
    return `${apart}-${streetNumber}, ${street}, ${province}, ${country}, ${postalCode}`;
  }

  /**
   * Prepare the chart data from the data
   *
   * @private
   */
  private _prepareChartData(): void {
    // Za3ma To Do
  }
  private async fetchOrganizationInformation() {
    const { idOrg } = this._route.snapshot.params;
    if (!Number(idOrg)) {
      this._toastrService.showError(constants.WRONG_ORG_ID);
    }
    await this.fetchOrganization(idOrg);
  }

  private async fetchOrganization(id: number) {
    try {
      this.organization = await this._adminOrganizationsService.getOrganization(id);
    } catch (error) {
      this._toastrService.showError(constants.FETCH_ORGANIZATION_FAILED);
    }
  }
}
