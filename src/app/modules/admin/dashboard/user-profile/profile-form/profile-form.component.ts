import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent implements OnInit {
  data: any;
  countries: any;
  userForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _http: HttpClient,
    private _formBuilder: FormBuilder,
  ) {}

  get emails(): FormArray {
    return this.userForm.controls['emails'] as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.userForm.controls['phoneNumbers'] as FormArray;
  }

  ngOnInit(): void {
    this._prepareUserData();
    this._prepareCountries();

    this.userForm = this._formBuilder.group({
      name: this.data.user.name,
      title: this.data.user.title,
      company: this.data.user.company,
      emails: this._formBuilder.array([]),
      phoneNumbers: this._formBuilder.array([]),
      address     : this.data.user.address,
      birthday    : this.data.user.birthday,
      notes       : this.data.user.notes,
    });

    this.data.user.emails.forEach(email => {
      const emailForm = this._formBuilder.group({
        email: email.email,
        label: email.label,
      });

      this.emails.push(emailForm);
    });

    this.data.user.phoneNumbers.forEach(phoneNumber => {
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
      label: ['Work']
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

  getCountryByIso(iso: string) {
    if (this.countries) {
      return this.countries.find((country) => country.iso === iso);
    }
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

  private _prepareUserData() {
    this.data = this._route.snapshot.data;
  }

  private _prepareCountries() {
    // TODO: Use backend service instead of mock api for country codes
    this._http.get('api/apps/contacts/countries').subscribe((countries) => (this.countries = countries));
  }
}
