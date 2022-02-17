import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { SwitchOrganizationsService } from './switch-organization.service';
import { NewUserInfosResolver } from 'app/layout/new-user-infos/new-user-infos.resolver';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/core/user/user.types';
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
  @Output() onActiveOrganizationChange = new EventEmitter<any>();
  availableOrganizations: Array<any>;
  activeOrganization: any;

  constructor(
    private _switchOrganizationsService: SwitchOrganizationsService,
    private _newUserInfosResolver: NewUserInfosResolver,
    private _route: ActivatedRoute,
  ) {}

  ngOnDestroy(): void {}

  async ngOnInit() {
    // fetch current user
    const { userData } = this._route.snapshot.data;
    // Move this line to layout.component.ts
    this.user = userData || (await this._newUserInfosResolver.getloadUserProfileKeycloak());
    // Get the available organizations for user
    this._switchOrganizationsService
      .getAllAvailableOrganizationsForUser(Number(this.user.id))
      .subscribe((organizations) => {
        this.availableOrganizations = organizations || [];
        this.activeOrganization = this.availableOrganizations[0] || {
          id: constants.EMPTY_ORGANIZATIONS,
          name: constants.EMPTY_ORGANIZATIONS, // TODO: Check for translation issues
        };
      });
  }

  /**
   * Set the active organization
   * Emit organization change
   *
   * @param organization
   */
  setActiveOrganization(organization: any): void {
    // Set the active lang
    this.activeOrganization = organization;
    this.onActiveOrganizationChange.emit(this.activeOrganization);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
}
