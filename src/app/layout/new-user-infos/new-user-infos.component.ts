import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NewUserInfosResolver } from './new-user-infos.resolver';
import { User } from 'app/models/user';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { ContactsService } from 'app/modules/admin/resolvers/contact.service';
import { Subject, takeUntil } from 'rxjs';
import { countries as countriesData } from 'app/mock-api/apps/contacts/data';

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
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _newUserInfosResolver: NewUserInfosResolver,
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private _http: HttpClient,
    private _contactsService: ContactsService,
    private _changeDetectorRef: ChangeDetectorRef,
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
      phoneCode: ['fr'],
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

    // Get the country telephone codes
    this._contactsService.countries$.pipe(takeUntil(this._unsubscribeAll)).subscribe((codes: any[]) => {
      this.countries = countriesData;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  async emitOnFormComplete() {
    const formUser: User = { ...this.form.value };
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

  onSubmit() {}

  getCountryByIso(): any {
    console.log({ form: this.form.value.phoneCode });
    return this.countries.find((country) => country.iso === this.form.value.phoneCode);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  /**
   * Fills the country array from the list of countries provided in the mock api
   */

  private _prepareCountries() {
    // TODO: retrieve countries from the backend instead of mock api
    this._http.get('api/apps/contacts/countries').subscribe((countries) => (this.countries = countries));
  }
}
