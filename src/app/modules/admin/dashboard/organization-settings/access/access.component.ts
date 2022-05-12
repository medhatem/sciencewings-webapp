import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { CookieService } from 'ngx-cookie-service';

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
  constructor(private _formBuilder: FormBuilder, private _toastrService: ToastrService, private organizationService: AdminOrganizationsService) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      anyMemberCanJoinYourOrganizationAndAccessResourceSchedules: true,
      joinCode: '',
      yourOrganizationWillNeverAppearInSearchResults: true,
      notifyAdministratorsWhenMembersJoinOrganization: true,
      listResourceToNonMembers: true,
      messageSentToNewMembers: '',
    });
    this.isMemberShouldAccessByJoinCode = !!this.settings.joinCode;

    this.form.setValue({
      anyMemberCanJoinYourOrganizationAndAccessResourceSchedules: this.settings.anyMemberCanJoinYourOrganizationAndAccessResourceSchedules,
      joinCode: this.settings.joinCode,
      yourOrganizationWillNeverAppearInSearchResults: this.settings.yourOrganizationWillNeverAppearInSearchResults,
      notifyAdministratorsWhenMembersJoinOrganization: this.settings.notifyAdministratorsWhenMembersJoinOrganization,
      listResourceToNonMembers: this.settings.listResourceToNonMembers,
      messageSentToNewMembers: this.settings.messageSentToNewMembers,
    });
  }

  onSubmit() {
    const data = { ...this.form.value };
    data.joinCode = this.isMemberShouldAccessByJoinCode ? data.joinCode : null;

    this.organizationService.updateOrganizationsSettingsProperties(1, data).subscribe((response) => {
      if (response.body.statusCode === 204) {
        this.updateLocalSettings.emit(this.form.value);
        this._toastrService.showSuccess('Updated Successfully');
      } else {
        this._toastrService.showError('Something went wrong!');
      }
    });
  }

  memberShouldAccessByJoinCodeListener(event) {
    this.isMemberShouldAccessByJoinCode = event.checked;
  }
}
