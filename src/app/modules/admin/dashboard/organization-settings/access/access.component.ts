import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'organization-settings-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss'],
})
export class AccessComponent implements OnInit {
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
    this.form = this._formBuilder.group({
      anyMemberCanJoinYourOrganizationAndAccessResourceSchedules: true,
      joinCode: '',
      yourOrganizationWillNeverAppearInSearchResults: true,
      notifyAdministratorsWhenMembersJoinOrganization: true,
      listResourceToNonMembers: true,
      messageSentToNewMembers: '',
    });
    this.isMemberShouldAccessByJoinCode = !!this.form.value.joinCode;

    this.form.setValue({
      anyMemberCanJoinYourOrganizationAndAccessResourceSchedules: this.form.value.anyMemberCanJoinYourOrganizationAndAccessResourceSchedules,
      joinCode: this.form.value.joinCode,
      yourOrganizationWillNeverAppearInSearchResults: this.form.value.yourOrganizationWillNeverAppearInSearchResults,
      notifyAdministratorsWhenMembersJoinOrganization: this.form.value.notifyAdministratorsWhenMembersJoinOrganization,
      listResourceToNonMembers: this.form.value.listResourceToNonMembers,
      messageSentToNewMembers: this.form.value.messageSentToNewMembers,
    });
  }

  onSubmit() {
    const data = { ...this.form.value };
    data.joinCode = this.isMemberShouldAccessByJoinCode ? data.joinCode : null;

    this.organizationService.updateOrganizationsSettingsProperties(1, data).subscribe((response) => {
      if (response.body.statusCode === 204) {
        this.updateLocalSettings.emit(this.form.value);
        this._toastrService.showSuccess(constants.UPDATE_SUCCESSFULLY);
      } else {
        this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
      }
    });
  }

  memberShouldAccessByJoinCodeListener(event) {
    this.isMemberShouldAccessByJoinCode = event.checked;
  }
}
