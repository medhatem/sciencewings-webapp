import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { SwitchOrganizationsService } from './switch-organization.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { User } from 'app/core/user/user.types';
import { UserOrganizations } from 'app/models/organizations/user-organizations';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'switch-organization',
  templateUrl: './switch-organization.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'switch-organization',
})
export class SwitchOrganizationComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Output() onActiveOrganizationChange = new EventEmitter<UserOrganizations>();
  isNoOrganization: boolean = false;
  availableOrganizations: Array<UserOrganizations>;
  activeOrganization: any;

  constructor(
    private _switchOrganizationsService: SwitchOrganizationsService,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnDestroy(): void {}

  async ngOnInit() {
    const userId = localStorage.getItem(constants.CURRENT_USER_ID);
    try {
      this.availableOrganizations = await this._switchOrganizationsService.getAllUserOrganizations(Number(userId));
      this.activeOrganization = this.availableOrganizations[0] || {
        id: constants.EMPTY_ORGANIZATIONS,
        name: constants.EMPTY_ORGANIZATIONS,
      };
      this.isNoOrganization = this.availableOrganizations.length > 0 ? false : true;
    } catch (error) {
      this._toastrService.showInfo('APP.SWITCH_ORGANIZATIONS_LOAD_FAILED');
      this.isNoOrganization = true;
      this._changeDetectorRef.markForCheck();
    }
  }

  setActiveOrganization(organization: UserOrganizations): void {
    this.activeOrganization = organization;
    localStorage.setItem(constants.USER_ORGANIZATION_ID, `${organization.id}`);
    this.onActiveOrganizationChange.emit(this.activeOrganization);
  }
}
