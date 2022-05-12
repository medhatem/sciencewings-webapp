import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';

@Component({
  selector: 'organization-settings-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  @Input() settings: any;
  @Output() updateLocalSettings = new EventEmitter<string>();
  form: FormGroup;
  isAccountNumberNote = false;

  constructor(private _formBuilder: FormBuilder, private _toastrService: ToastrService, private organizationService: AdminOrganizationsService) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      membersCanEditAccountNumbers: true,
      promptForAccouantNumbers: true,
      acountNumberNote: '',
      allowMembersToSeeAllOtherMembers: true,
    });
    this.isAccountNumberNote = !!this.settings.acountNumberNote;
    this.form.setValue({
      membersCanEditAccountNumbers: this.settings.membersCanEditAccountNumbers,
      promptForAccouantNumbers: this.settings.promptForAccouantNumbers,
      acountNumberNote: this.settings.acountNumberNote,
      allowMembersToSeeAllOtherMembers: this.settings.allowMembersToSeeAllOtherMembers,
    });
  }
  accountNumberNoteListener(event) {
    this.isAccountNumberNote = event.checked;
  }

  onSubmit() {
    const data = { ...this.form.value };

    this.organizationService.updateOrganizationsSettingsProperties(1, data).subscribe((response) => {
      if (response.body.statusCode === 204) {
        this.updateLocalSettings.emit(this.form.value);
        this._toastrService.showSuccess('Updated Successfully');
      } else {
        this._toastrService.showError('Something went wrong!');
      }
    });
  }
}
