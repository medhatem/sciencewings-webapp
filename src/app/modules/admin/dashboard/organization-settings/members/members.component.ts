import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { UpdateOrganizationMemberSettingsRo } from 'app/models/organizations/organization';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { constants } from 'app/shared/constants';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'organization-settings-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit, AfterViewInit {
  @Input() settings: any;
  @Output() updateLocalSettings = new EventEmitter<string>();
  form: FormGroup;
  isAccountNumberNote: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private organizationService: AdminOrganizationsService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      membersCanEditAccountNumbers: [],
      promptForAccouantNumbers: [],
      acountNumberNote: [],
      allowMembersToSeeAllOtherMembers: [],
    });
  }
  accountNumberNoteListener(event) {
    this.isAccountNumberNote = event.checked;
    this.form.value.acountNumberNote = '';
  }
  async ngAfterViewInit(): Promise<void> {
    this.form.setValue({
      membersCanEditAccountNumbers: this.settings.membersCanEditAccountNumbers,
      promptForAccouantNumbers: this.settings.promptForAccouantNumbers,
      acountNumberNote: this.settings.acountNumberNote,
      allowMembersToSeeAllOtherMembers: this.settings.allowMembersToSeeAllOtherMembers,
    });
    this.isAccountNumberNote = this.settings.acountNumberNote ? true : false;
  }

  async onSubmit() {
    const orgId = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    const updatedMemberSettings = this.getUpdatedSettingsFromFormBuilder();

    const response = await this.organizationService.updateOrganizationMembersProperties(Number(orgId), updatedMemberSettings);
    if (response.body.statusCode === 204) {
      this.updateLocalSettings.emit(this.form.value);
      this._toastrService.showSuccess(constants.UPDATE_SUCCESSFULLY);
    } else {
      this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
    }
  }
  private getUpdatedSettingsFromFormBuilder(): UpdateOrganizationMemberSettingsRo {
    return new UpdateOrganizationMemberSettingsRo({
      acountNumberNote: this.form.value.acountNumberNote,
      allowMembersToSeeAllOtherMembers: this.form.value.allowMembersToSeeAllOtherMembers,
      membersCanEditAccountNumbers: this.form.value.membersCanEditAccountNumbers,
      promptForAccouantNumbers: this.form.value.promptForAccouantNumbers,
    });
  }
}
