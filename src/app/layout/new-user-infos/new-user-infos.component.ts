import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUserInfosResolver } from './new-user-infos.resolver';
import { User, Phone, Address } from 'app/models';

@Component({
  selector: 'new-user-infos',
  templateUrl: './new-user-infos.component.html',
})
export class NewUserInfosComponent implements OnInit {
  @Input() hideMenusAndButtons: boolean;
  @Output() onFormComplete = new EventEmitter<boolean>();
  user: any;
  stepperForm: FormGroup;

  constructor(private _newUserInfosResolver: NewUserInfosResolver, private _formBuilder: FormBuilder) {}

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
}
