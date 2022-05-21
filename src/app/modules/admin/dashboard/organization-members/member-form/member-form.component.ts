import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'member-form',
  templateUrl: './member-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MemberFormComponent implements OnInit {
  memberForm: FormGroup;
  isInvitationPersonalize: boolean = false;

  constructor(public matDialogRef: MatDialogRef<MemberFormComponent>, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Create the form
    this.memberForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
