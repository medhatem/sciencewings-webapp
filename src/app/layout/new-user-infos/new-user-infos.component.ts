import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NewUserInfosResolver } from './new-user-infos.resolver';
import { User, Phone, Address } from 'app/models';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { NewUserInfosService } from './new-user-infos.service';

import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'new-user-infos',
  templateUrl: './new-user-infos.component.html',
})
export class NewUserInfosComponent implements OnInit {
  @Input() hideMenusAndButtons: boolean;
  @Output() onFormComplete = new EventEmitter<boolean>();
  user: any;
  countries: any;
  stepperForm: FormGroup;

  constructor(
    private _newUserInfosResolver: NewUserInfosResolver,
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private _http: HttpClient,
    private _newUserService: NewUserInfosService,
  ) {}

  get addresses(): FormArray {
    return (this.stepperForm.controls['step2'] as FormGroup).controls['addresses'] as FormArray;
  }

  get phones(): FormArray {
    return (this.stepperForm.controls['step2'] as FormGroup).controls['phones'] as FormArray;
  }

  emitOnFormComplete() {
    const formUser: User = this.stepperForm.controls['step1'].value;
    const formUserAddresses: Array<Address> = this.addresses.value;
    const formUserPhones: Array<Phone> = this.phones.value;

    formUser['email'] = this.user.email;
    formUser['phones'] = formUserPhones;
    formUser['addresses'] = formUserAddresses;
    formUser['dateofbirth'] = moment(formUser['dateofbirth']).format(constants.DATE_FORMAT_YYYY_MM_DD);

    this.onFormComplete.emit(false);
  }

  async ngOnInit() {
    this._prepareCountries();

    try {
      this.user = await this._newUserInfosResolver.getloadUserProfileKeycloak();
    } catch (err) {
      this._toastr.showError(err);
    }

    this.stepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        firstname: [this.user.firstName, [Validators.required]],
        lastname: [this.user.lastName, [Validators.required]],
        email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]],
        dateofbirth: new FormControl(moment()),
        keycloakId: localStorage.getItem(constants.KEYCLOAK_USER_ID),
      }),
      step2: this._formBuilder.group({
        phones: this._formBuilder.array([]),
        addresses: this._formBuilder.array([]),
      }),
    });

    this.phones.push(
      this._formBuilder.group({
        phoneCode: [constants.NEW_USER.DEFAULT_COUNTRY_CODE, Validators.required],
        phoneNumber: ['', Validators.required],
        phoneLabel: '',
      }),
    );

    this.addresses.push(
      this._formBuilder.group({
        street: ['', Validators.required],
        apartment: [''],
        province: ['', Validators.required],
        city: ['', Validators.required],
        code: ['', Validators.required],
        country: [constants.NEW_USER.DEFAULT_COUNTRY, Validators.required],
        type: constants.NEW_USER.DEFAULT_TYPE,
      }),
    );
  }

  /**
   * Use this for [matDatepickerFilter] property to give
   * the user selection from previous dates only
   */

  dateFilter(d: Date | null): boolean {
    const date = d || new Date();
    return date < new Date();
  }

  /**
   * Adds a phone form to the phones FormArray
   */

  addPhone() {
    const phoneForm = this._formBuilder.group({
      phoneCode: [constants.NEW_USER.DEFAULT_COUNTRY_CODE, Validators.required],
      phoneNumber: ['', Validators.required],
      phoneLabel: '',
    });

    this.phones.push(phoneForm);
  }

  /**
   * Adds an address form to the phones FormArray
   */

  addAddress() {
    const addressForm = this._formBuilder.group({
      street: ['', Validators.required],
      apartment: [''],
      province: ['', Validators.required],
      city: ['', Validators.required],
      code: ['', Validators.required],
      country: [constants.NEW_USER.DEFAULT_COUNTRY, Validators.required],
      type: constants.NEW_USER.DEFAULT_TYPE,
    });

    this.addresses.push(addressForm);
  }

  /**
   * Removes a phone form to the phones FormArray
   */

  deletePhone(index) {
    this.phones.removeAt(index);
  }

  /**
   * Removes an address form to the phones FormArray
   */

  deleteAddress(index) {
    this.addresses.removeAt(index);
  }

  /**
   * Gets a country (by name) from the list of countries provided in the mock api
   */

  getCountryByName(name: string) {
    if (this.countries) {
      return this.countries.find((country) => country.name === name);
    }
  }

  /**
   * Gets a country (by code) from the list of countries provided in the mock api
   */

  getCountryByCode(code: string) {
    if (this.countries) {
      return this.countries.find((country) => country.code === code);
    }
  }

  /**
   * Fills the country array from the list of countries provided in the mock api
   */

  private _prepareCountries() {
    // TODO: retrieve countries from the backend instead of mock api
    this._http.get('api/apps/contacts/countries').subscribe((countries) => (this.countries = countries));
  }
}
