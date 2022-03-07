import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NewUserInfosResolver } from './new-user-infos.resolver';
import { User, Phone, Address } from 'app/models';
import { ToastrService } from 'app/core/toastr/toastr.service';

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

  emitOnFormComplete() {
    // false to emit that : hideMenusAndButtons = false
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
        firstName: [this.user.firstName, [Validators.required]],
        lastName: [this.user.lastName, [Validators.required]],
        email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]],
        dateOfBirth: ['', Validators.required],
      }),
      step2: this._formBuilder.group({
        phones: this._formBuilder.array([]),
        addresses: this._formBuilder.array([]),
      }),
    });

    (this.stepperForm.controls['step2'] as FormGroup).controls['addresses'] = this._formBuilder.group({
      id: 0,
      street: '',
      apartment: '',
      province: '',
      city: '',
      code: '',
      country: 'Algeria',
      type: 'USER',
    });
  }

  getCountryByName(name: string) {
    if (this.countries) {
      return this.countries.find((country) => country.name === name);
    }
  }

  private _prepareCountries() {
    // TODO: retrieve countries from the backend instead of mock api
    this._http.get('api/apps/contacts/countries').subscribe((countries) => (this.countries = countries));
  }
}
