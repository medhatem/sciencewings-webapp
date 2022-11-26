import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewUserInfosResolver } from './new-user-infos.resolver';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { User, UserRequestObject } from 'app/models/user';
import { Address, Phone } from 'app/models';
import { ActivatedRoute } from '@angular/router';

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
    private _route: ActivatedRoute,
    private _newUserInfosResolver: NewUserInfosResolver,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
  ) {}

  get formControls() {
    return this.form?.controls;
  }

  ngOnInit() {
    const { userKeycloackData } = this._route.snapshot.data;
    this.user = userKeycloackData;
    this.createFormBuilderForUser();
  }

  /**
   * Validates the form informations and fields,
   * then calls create user endpoint.
   *
   * @returns void to out from function if form not valid.
   */
  async emitOnFormComplete() {
    if (this.form.invalid) {
      return this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
    }

    const formUser = { ...this.form.value };
    const phones = [new Phone({ ...this.form.value })];
    const address = new Address({ ...this.form.value });
    const userPayload = new UserRequestObject({
      ...this.form.value,
      phones,
      address,
      email: this.user.email,
      dateofbirth: moment(formUser['dateofbirth']).format(constants.DATE_FORMAT_YYYY_MM_DD),
    });

    const createdUser = await this._newUserInfosResolver.createUser(userPayload);
    this.user = createdUser;
    localStorage.setItem(constants.CURRENT_USER_ID, `${createdUser.id}`);
    localStorage.setItem(constants.CURRENT_MODULE, constants.MODULES_ROUTINGS_URLS.ADMIN);
    this.onFormNotComplete.emit(false);
  }

  /**
   * Use this for [matDatepickerFilter] property to give
   * the user selection from previous dates only.
   *
   * @param date
   * @returns
   */
  dateFilter(date: Date | null): boolean {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const maxDateToPick = date || today;
    const mustBeAtLeast14YearsOld = new Date(year - constants.MINIMUM_AGE, month, day);

    return maxDateToPick < mustBeAtLeast14YearsOld;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  /**
   * Only numbers are accepted in the input.
   *
   * @param event
   */
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  /**
   * Creates the from builder for user registration, with its
   * validations, and initialize information based on keycloack infos
   */
  private createFormBuilderForUser() {
    this.form = this._formBuilder.group({
      firstname: [this.user.firstName, [Validators.required]],
      lastname: [this.user.lastName, [Validators.required]],
      email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]],
      dateofbirth: new FormControl(moment()),
      keycloakId: localStorage.getItem(constants.CURRENT_USER_KEYCLOAK_ID),
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
      street: ['', Validators.required],
      apartment: [''],
      province: ['', Validators.required],
      city: ['', Validators.required],
      code: ['', Validators.required],
      country: ['Canada', Validators.required],
    });
  }
}
