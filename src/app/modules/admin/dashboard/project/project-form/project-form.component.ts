import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectFormComponent implements OnInit {
  groupForm: FormGroup;
  isInvitationPersonalize: boolean = false;

  constructor(public matDialogRef: MatDialogRef<ProjectFormComponent>, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.groupForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.name]],
      member: [''],
      description: [''],
    });
  }
}
