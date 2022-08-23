import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'group-form',
  templateUrl: './group-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class GroupFormComponent implements OnInit {
  groupForm: FormGroup;
  isInvitationPersonalize: boolean = false;

  constructor(public matDialogRef: MatDialogRef<GroupFormComponent>, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.groupForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.name]],
      member: [''],
      description: [''],
    });
  }
}
