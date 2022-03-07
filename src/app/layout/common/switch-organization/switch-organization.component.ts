import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { SwitchOrganizationsService } from './switch-organization.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/core/user/user.types';
import { constants } from 'app/shared/constants';
import { UserOrganizations } from 'app/models/organizations/user-organizations';

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
  availableOrganizations: Array<UserOrganizations>;
  activeOrganization: any;

  constructor(private _switchOrganizationsService: SwitchOrganizationsService, private _route: ActivatedRoute) {}

  ngOnDestroy(): void {}

  async ngOnInit() {
    const { userData } = this._route.snapshot.data;
    this._switchOrganizationsService.getAllUserOrganizations(Number(userData.id)).subscribe((organizations) => {
      this.availableOrganizations = organizations || [];
      this.activeOrganization = this.availableOrganizations[0] || {
        id: constants.EMPTY_ORGANIZATIONS,
        name: constants.EMPTY_ORGANIZATIONS,
      };
    });
  }

  setActiveOrganization(organization: UserOrganizations): void {
    this.activeOrganization = organization;
    localStorage.setItem(constants.USER_ORGANIZATION_ID, `${organization.id}`);
    this.onActiveOrganizationChange.emit(this.activeOrganization);
  }
}
