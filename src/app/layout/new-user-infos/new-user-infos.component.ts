import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NewUserInfosResolver } from './new-user-infos.resolver';
import { User, Phone, Address } from 'app/models';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'new-user-infos',
  templateUrl: './new-user-infos.component.html',
})
export class NewUserInfosComponent implements OnInit {
  @Output() onFormComplete = new EventEmitter<boolean>();
  user: any;
  countries: any;
  form: FormGroup;
  constructor(
    private _newUserInfosResolver: NewUserInfosResolver,
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private _http: HttpClient,
  ) {}

  async ngOnInit() {
    this._prepareCountries();

    try {
      this.user = await this._newUserInfosResolver.loadUserProfileKeycloak();
    } catch (err) {
      this._toastr.showError(err);
    }

    this.form = this._formBuilder.group({
      firstname: [this.user.firstName, [Validators.required]],
      lastname: [this.user.lastName, [Validators.required]],
      email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]],
      dateofbirth: new FormControl(moment()),
      keycloakId: localStorage.getItem(constants.KEYCLOAK_USER_ID),
      phoneNumber: [''],
      phoneCode: [''],
      phoneLabel: [''],
      addresses: this._formBuilder.array([]),
      street: ['', Validators.required],
      apartment: [''],
      province: ['', Validators.required],
      city: ['', Validators.required],
      code: ['', Validators.required],
      country: [constants.NEW_USER.DEFAULT_COUNTRY, Validators.required],
      type: constants.NEW_USER.DEFAULT_TYPE,
    });
  }

  async emitOnFormComplete() {
    const formUser: User = this.form.value;
    const userRo = {
      ...formUser,
      email: this.user.email,
      dateofbirth: moment(formUser['dateofbirth']).format(constants.DATE_FORMAT_YYYY_MM_DD),
    };
    const result = await this._newUserInfosResolver.createUser(userRo);
    this.onFormComplete.emit(false);
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
