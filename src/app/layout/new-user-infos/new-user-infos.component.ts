import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { IMatChipLabel } from 'app/models/mat-ui/mat-chip-label.interface';
import { NewUserInfosResolver } from './new-user-infos.resolver';

@Component({
  selector: 'new-user-infos',
  templateUrl: './new-user-infos.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NewUserInfosComponent implements OnInit {
  @Input() hideMenusAndButtons: boolean;
  @Output() onFormComplete = new EventEmitter<boolean>();
  user: any;
  stepperForm: FormGroup;
  isSubOrganization = false;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  // temp data to replace with mock api or actual api
  userLabels: IMatChipLabel[] = [];

  constructor(private _newUserInfosResolver: NewUserInfosResolver, private _router: Router, private _formBuilder: FormBuilder) {}

  emitOnFormComplete() {
    // false to emit that : hideMenusAndButtons = false
    this.onFormComplete.emit(false);
  }

  async ngOnInit() {
    this.user = await this._newUserInfosResolver.getloadUserProfileKeycloak();
    this.stepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        firstName: [this.user.firstName, [Validators.required]],
        lastName: [this.user.lastName, [Validators.required]],
        email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]],
        dateOfBirth: ['', Validators.required],
      }),
      step2: this._formBuilder.group({
        apartNumber: [''],
        about: [''],
        streetNumber: [''],
        street: [''],
        country: [''],
        province: [''],
        postalCode: [''],
        department: [''],
        sector: [''],
        facebook: [''],
        linkedin: [''],
        twitter: [''],
        other: [''],
      }),
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.userLabels.push({ value });
    }

    // Clear the input value
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    event.chipInput!.clear();
  }

  remove(fruit: IMatChipLabel): void {
    const index = this.userLabels.indexOf(fruit);

    if (index >= 0) {
      this.userLabels.splice(index, 1);
    }
  }
}
