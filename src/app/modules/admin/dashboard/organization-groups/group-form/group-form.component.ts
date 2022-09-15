import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Group, GroupService } from 'app/modules/admin/resolvers/groups/groups.service';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'group-form',
  templateUrl: './group-form.component.html',
})
export class GroupFormComponent implements OnInit {
  groupForm: FormGroup;
  isInvitationPersonalize: boolean = false;

  constructor(public matDialogRef: MatDialogRef<GroupFormComponent>, private _formBuilder: FormBuilder, private _groupService: GroupService) {}

  ngOnInit(): void {
    this.groupForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      member: [''],
      description: [''],
    });
  }

  async submit() {
    const organization = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    const group = new Group({ ...this.groupForm.value, organization });
    try {
      await this._groupService.createGroup(group);
    } catch (error) {
      console.log('error', error);
    }
  }
}
