import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'member-form',
  templateUrl: './group-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class GroupFormComponent implements OnInit {
  groupForm: FormGroup;
  isInvitationPersonalize: boolean = false;

  constructor(public matDialogRef: MatDialogRef<GroupFormComponent>, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Create the form
    this.groupForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
