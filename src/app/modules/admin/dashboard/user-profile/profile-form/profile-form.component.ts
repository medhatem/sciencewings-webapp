import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Country } from 'app/models/country.interface';

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent implements OnInit {
  @Input() user: any;
  @Input() countries: Country[];
  userForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  get emails(): FormArray {
    return this.userForm.controls['emails'] as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.userForm.controls['phoneNumbers'] as FormArray;
  }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      name: this.user.name,
      title: this.user.title,
      company: this.user.company,
      emails: this._formBuilder.array([]),
      phoneNumbers: this._formBuilder.array([]),
      address: this.user.address,
      birthday: this.user.birthday,
      notes: this.user.notes,
    });

    this.user.emails.forEach((email) => {
      const emailForm = this._formBuilder.group({
        email: email.email,
        label: email.label,
      });

      this.emails.push(emailForm);
    });

    this.user.phoneNumbers.forEach((phoneNumber) => {
      const emailForm = this._formBuilder.group({
        country: phoneNumber.country,
        phoneNumber: phoneNumber.phoneNumber,
        label: phoneNumber.label,
      });

      this.phoneNumbers.push(emailForm);
    });
  }

  addEmail() {
    const emailForm = this._formBuilder.group({
      email: ['', Validators.email],
      label: ['Work'],
    });

    this.emails.push(emailForm);
  }

  deleteEmail(index) {
    this.emails.removeAt(index);
  }

  addPhoneNumber() {
    const phoneNumberForm = this._formBuilder.group({
      country: ['dz'],
      phoneNumber: [''],
      label: ['Mobile'],
    });

    this.phoneNumbers.push(phoneNumberForm);
  }

  deletePhoneNumber(index) {
    this.phoneNumbers.removeAt(index);
  }

  getCountryByIso(ISO: string) {
    // Default country Canada
    const countryCanada = { flagImagePos: '-1px -1803px' };
    return this.countries?.find(({ iso }) => iso === ISO) || countryCanada;
  }

  uploadAvatar(fileList: FileList): void {
    if (!fileList.length) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];

    if (!allowedTypes.includes(file.type)) {
      return;
    }

    // TODO: Use backend service to upload the profile picture
  }
}
