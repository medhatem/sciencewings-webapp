import { Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewUserInfosResolver } from './new-user-infos.resolver';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants, countries } from 'app/shared/constants';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { Country } from 'app/models/country.interface';
import { HttpClient } from '@angular/common/http';
import { ContactsService } from 'app/modules/admin/resolvers/contact.service';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'new-user-infos',
  templateUrl: './new-user-infos.component.html',
})
export class NewUserInfosComponent implements OnInit, OnDestroy {
  @Output() onFormComplete = new EventEmitter<boolean>();
  user: any;
  countries: Country[] = [];
  form: FormGroup;
  selectedCountry: any = {
    id: '4c8ba1fc-0203-4a8f-8321-4dda4a0c6732',
    iso: 'fr',
    name: 'France',
    code: '+33',
    flagImagePos: '-1px -324px',
  };
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _newUserInfosResolver: NewUserInfosResolver,
    private _formBuilder: FormBuilder,
    private _httpClient: HttpClient,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _contactsService: ContactsService,
  ) {}

  async ngOnInit() {
    await this._prepareCountries();
    this.user = await this._newUserInfosResolver.loadUserProfileKeycloak();
    this.form = this._formBuilder.group({
      firstname: [this.user.firstName, [Validators.required]],
      lastname: [this.user.lastName, [Validators.required]],
      email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]],
      dateofbirth: new FormControl(moment()),
      keycloakId: localStorage.getItem(constants.KEYCLOAK_USER_ID),
      phoneNumber: ['', [Validators.required]],
      phoneCode: ['fr', [Validators.required]],
      phoneLabel: ['', [Validators.required]],
      street: ['', Validators.required],
      apartment: [''],
      province: ['', Validators.required],
      city: ['', Validators.required],
      code: ['', Validators.required],
      country: [constants.NEW_USER.DEFAULT_COUNTRY, Validators.required],
    });
    // Get the country telephone codes
    this._contactsService.countries$.pipe(takeUntil(this._unsubscribeAll)).subscribe((codes: any[]) => {
      this.countries = countries as any as Country[];
      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  async emitOnFormComplete() {
    if (!this.form.valid) {
      return this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
    }
    const formUser = { ...this.form.value };
    delete formUser.phoneNumber;
    delete formUser.phoneCode;
    delete formUser.phoneLabel;
    formUser.phones = [
      {
        phoneNumber: formUser.phoneNumber,
        phoneCode: formUser.phoneCode,
        phoneLabel: formUser.phoneLabel,
      },
    ];

    delete formUser.street;
    delete formUser.apartment;
    delete formUser.province;
    delete formUser.city;
    delete formUser.code;
    delete formUser.country;
    formUser.addresses = [
      {
        street: formUser.street,
        apartment: formUser.apartment,
        province: formUser.province,
        city: formUser.city,
        code: formUser.code,
        country: formUser.country,
      },
    ];
    const userRo = {
      ...formUser,
      email: this.user.email,
      dateofbirth: moment(formUser['dateofbirth']).format(constants.DATE_FORMAT_YYYY_MM_DD),
    };
    try {
      const createdUser = await this._newUserInfosResolver.createUser(userRo);
      if (createdUser) {
        this.user = createdUser;
        this.onFormComplete.emit(false);
      }
    } catch (error) {
      this.onFormComplete.emit(true);
    }
  }

  /**
   * Use this for [matDatepickerFilter] property to give
   * the user selection from previous dates only
   */

  dateFilter(d: Date | null): boolean {
    const date = d || new Date();
    return date < new Date();
  }

  onSelectedCountryCodeChange($event): any {
    this.selectedCountry = this.countries.find((country) => country.iso === $event);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private async _prepareCountries() {
    try {
      this.countries = await lastValueFrom(this._httpClient.get<Country[]>('api/apps/contacts/countries'));
    } catch (error) {
      this._toastrService.showInfo(constants.FAILED_LOAD_COUNTRIES);
    }
  }
}
