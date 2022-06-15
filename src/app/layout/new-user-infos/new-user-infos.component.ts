import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewUserInfosResolver } from './new-user-infos.resolver';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { User } from 'app/models/user';
import { Address, Phone } from 'app/models';
import { CookieService } from 'ngx-cookie-service';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'new-user-infos',
  templateUrl: './new-user-infos.component.html',
})
export class NewUserInfosComponent implements OnInit {
  @Output() onFormNotComplete = new EventEmitter<boolean>();
  user: any;
  form: FormGroup;

  constructor(
    private _newUserInfosResolver: NewUserInfosResolver,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _coookies: CookieService,
  ) {}

  get formControls() {
    return this.form?.controls;
  }

  async ngOnInit() {
    this.user = await this._newUserInfosResolver.loadUserProfileKeycloak();
    this.form = this._formBuilder.group({
      firstname: [this.user.firstName, [Validators.required]],
      lastname: [this.user.lastName, [Validators.required]],
      email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]],
      dateofbirth: new FormControl(moment()),
      keycloakId: localStorage.getItem(constants.KEYCLOAK_USER_ID),
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      street: ['', Validators.required],
      apartment: [''],
      province: ['', Validators.required],
      city: ['', Validators.required],
      code: ['', Validators.required],
      country: [constants.NEW_USER.DEFAULT_COUNTRY, Validators.required],
    });
  }

  async emitOnFormComplete() {
    if (!this.form.valid) {
      return this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
    }
    const formUser = { ...this.form.value };
    const phones = [new Phone({ ...this.form.value })];
    const addresses = [new Address({ ...this.form.value })];
    const userPayload = new User({
      ...this.form.value,
      phones,
      addresses,
      email: this.user.email,
      dateofbirth: moment(formUser['dateofbirth']).format(constants.DATE_FORMAT_YYYY_MM_DD),
    });

    try {
      const createdUser = await this._newUserInfosResolver.createUser(userPayload);
      if (createdUser) {
        this.user = createdUser;
        this._coookies.set(constants.ROUTING_URL, 'dashboard');
        this.onFormNotComplete.emit(false);
      }
    } catch (error) {
      return this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
    }
  }

  /**
   * Use this for [matDatepickerFilter] property to give
   * the user selection from previous dates only
   */
  dateFilter(d: Date | null): boolean {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const maxDateToPick = d || today;
    const mustBeAtLeast14YearsOld = new Date(year - constants.MINIMUM_AGE, month, day);

    return maxDateToPick < mustBeAtLeast14YearsOld;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  //only number will be add
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
