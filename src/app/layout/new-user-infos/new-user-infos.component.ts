import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NewUserInfosResolver } from './new-user-infos.resolver';
import { User, Phone, Address } from 'app/models';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { NewUserInfosService } from './new-user-infos.service';

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

    // TODO: remove before PR
    console.log('user: ', formUser);
    // TODO: remove before PR
    this._newUserService.createUser(formUser).subscribe((res) => console.log('created:', res));

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
        apartment: ['', Validators.required],
        province: ['', Validators.required],
        city: ['', Validators.required],
        code: ['', Validators.required],
        country: [constants.NEW_USER.DEFAULT_COUNTRY, Validators.required],
        type: constants.NEW_USER.DEFAULT_TYPE,
      }),
    );
  }

  dateFilter(d: Date | null): boolean {
    const date = d || new Date();
    return date < new Date();
  }

  addPhone() {
    const phoneForm = this._formBuilder.group({
      phoneCode: [constants.NEW_USER.DEFAULT_COUNTRY_CODE, Validators.required],
      phoneNumber: ['', Validators.required],
      phoneLabel: '',
    });

    this.phones.push(phoneForm);
  }

  addAddress() {
    const addressForm = this._formBuilder.group({
      street: ['', Validators.required],
      apartment: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      code: ['', Validators.required],
      country: [constants.NEW_USER.DEFAULT_COUNTRY, Validators.required],
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
