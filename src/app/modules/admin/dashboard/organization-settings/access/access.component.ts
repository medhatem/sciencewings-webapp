import { AfterViewInit, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { UpdateOrganizationAccessSettingsRo } from 'app/models/organizations/organization';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'organization-settings-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss'],
})
export class AccessComponent implements OnInit, AfterViewInit {
  @Input() settings: any;
  @Output() updateLocalSettings = new EventEmitter<string>();
  form: FormGroup;
  isMemberShouldAccessByJoinCode = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private organizationService: AdminOrganizationsService,
  ) {}

  ngOnInit(): void {
    console.log('settings=', this.settings);
    this.form = this._formBuilder.group({
      anyMemberCanJoinYourOrganizationAndAccessResourceSchedules: true,
      joinCode: this.settings?.joinCode || '',
      listResourceToNonMembers: true,
      messageSentToNewMembers: this.settings?.messageSentToNewMembers || '',
      notifyAdministratorsWhenMembersJoinOrganization: true,
      yourOrganizationWillNeverAppearInSearchResults: true,
    });
    this.isMemberShouldAccessByJoinCode = !!this.form.value.joinCode;
  }

  async ngAfterViewInit(): Promise<void> {
    this.form.setValue({
      anyMemberCanJoinYourOrganizationAndAccessResourceSchedules: this.settings.anyMemberCanJoinYourOrganizationAndAccessResourceSchedules,
      joinCode: this.settings?.joinCode || '',
      listResourceToNonMembers: this.settings.listResourceToNonMembers,
      messageSentToNewMembers: this.settings?.messageSentToNewMembers || '',
      notifyAdministratorsWhenMembersJoinOrganization: this.settings.notifyAdministratorsWhenMembersJoinOrganization,
      yourOrganizationWillNeverAppearInSearchResults: this.settings.yourOrganizationWillNeverAppearInSearchResults,
    });
  }

  async onSubmit() {
    const orgId = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    const updatedSettings = this.getUpdatedSettingsFromFormBuilder();
    updatedSettings.joinCode = this.isMemberShouldAccessByJoinCode ? updatedSettings.joinCode : null;

    const response = await this.organizationService.updateOrganizationAccessProperties(Number(orgId), updatedSettings);
    if (response.body.statusCode === 204) {
      this.updateLocalSettings.emit(this.form.value);
      this._toastrService.showSuccess(constants.UPDATE_SUCCESSFULLY);
    } else {
      this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
    }
  }

  memberShouldAccessByJoinCodeListener(event) {
    this.isMemberShouldAccessByJoinCode = event.checked;
  }

  private getUpdatedSettingsFromFormBuilder(): UpdateOrganizationAccessSettingsRo {
    return new UpdateOrganizationAccessSettingsRo({
      anyMemberCanJoinYourOrganizationAndAccessResourceSchedules: this.form.value.anyMemberCanJoinYourOrganizationAndAccessResourceSchedules,
      joinCode: this.form.value.joinCode,
      listResourceToNonMembers: this.form.value.listResourceToNonMembers,
      messageSentToNewMembers: this.form.value.messageSentToNewMembers,
      notifyAdministratorsWhenMembersJoinOrganization: this.form.value.notifyAdministratorsWhenMembersJoinOrganization,
      yourOrganizationWillNeverAppearInSearchResults: this.form.value.yourOrganizationWillNeverAppearInSearchResults,
    });
  }
}
