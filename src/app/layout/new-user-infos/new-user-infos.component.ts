import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NewUserInfosResolver } from './new-user-infos.resolver';
import { User, Phone, Address } from 'app/models';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';

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
  ) {}

  get addresses(): FormArray {
    return (this.stepperForm.controls['step2'] as FormGroup).controls['addresses'] as FormArray;
  }

  get phones(): FormArray {
    return (this.stepperForm.controls['step2'] as FormGroup).controls['phones'] as FormArray;
  }

  emitOnFormComplete() {
    // TODO: clear up things about the use of ROs, for example: ids should be optional
    const userInfos = this.stepperForm.controls['step1'].value;
    userInfos['email'] = this.user.email;
    userInfos['phones'] = (this.stepperForm.controls['step2'] as FormGroup).controls['phones'].value;
    userInfos['address'] = (this.stepperForm.controls['step2'] as FormGroup).controls['addresses'].value;

    console.log('addresses: ', userInfos);

    console.log((this.stepperForm.controls['step1'] as FormGroup).controls['firstName'].value);
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
        dateofbirth: ['', Validators.required],
      }),
      step2: this._formBuilder.group({
        phones: this._formBuilder.array([]),
        addresses: this._formBuilder.array([]),
      }),
    });

    (this.stepperForm.controls['step2'] as FormGroup).controls['phones'] = this._formBuilder.array([
      this._formBuilder.group({
        code: constants.NEW_USER.DEFAULT_COUNTRY_CODE,
        // eslint-disable-next-line id-blacklist
        number: '',
        label: '',
      }),
    ]);

    (this.stepperForm.controls['step2'] as FormGroup).controls['addresses'] = this._formBuilder.array([
      this._formBuilder.group({
        street: '',
        apartment: '',
        province: '',
        city: '',
        code: '',
        country: constants.NEW_USER.DEFAULT_COUNTRY,
        type: constants.NEW_USER.DEFAULT_TYPE,
      }),
    ]);
  }

  dateFilter(d: Date | null): boolean {
    const date = d || new Date();
    return date < new Date();
  }

  addPhone() {
    const phoneForm = this._formBuilder.group({
      code: constants.NEW_USER.DEFAULT_COUNTRY_CODE,
      // eslint-disable-next-line id-blacklist
      number: '',
      label: '',
    });

    this.phones.push(phoneForm);
  }

  addAddress() {
    const addressForm = this._formBuilder.group({
      street: '',
      apartment: '',
      province: '',
      city: '',
      code: '',
      country: constants.NEW_USER.DEFAULT_COUNTRY,
      type: constants.NEW_USER.DEFAULT_TYPE,
    });

    this.addresses.push(addressForm);
  }

  deletePhone(index) {
    this.phones.removeAt(index);
  }

  deleteAddress(index) {
    this.addresses.removeAt(index);
  }

  getCountryByName(name: string) {
    if (this.countries) {
      return this.countries.find((country) => country.name === name);
    }
  }

  getCountryByCode(code: string) {
    if (this.countries) {
      return this.countries.find((country) => country.code === code);
    }
  }

  private _prepareCountries() {
    // TODO: retrieve countries from the backend instead of mock api
    this._http.get('api/apps/contacts/countries').subscribe((countries) => (this.countries = countries));
  }
}
