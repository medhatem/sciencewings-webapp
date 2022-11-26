import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'app/core/user/user.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { constants } from 'app/shared/constants';
import { Address } from 'app/models/address';
import { Phone } from 'app/models/phone';
import { User, UserRequestObject } from 'app/models/user';
import moment from 'moment';
import { countryCanada } from 'app/mock-api/apps/contacts/data';
export interface DialogData {
  idOrg: number;
  userId: number;
  profile: User;
}

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditUserInfoComponent implements OnInit {
  @Output() updateLocalUser = new EventEmitter<string>();
  profile: FormGroup;
  countries = countryCanada;
  user: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _matDialogRef: MatDialogRef<EditUserInfoComponent>,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _cdf: ChangeDetectorRef,
    private _userService: UserService,
  ) {}

  ngOnInit(): void {
    const {
      email,
      dateofbirth,
      firstname = '',
      lastname = '',
      phones = { phoneCode: '', phoneLabel: '', phoneNumber: '' },

      address = { apartment: '', code: '', city: '', country: '', province: '', street: '' },
    } = this.data.profile;
    this.profile = this._formBuilder.group({
      firstname: [firstname],
      lastname: [lastname],
      email: [email],
      dateofbirth: [dateofbirth],
      phoneCode: ['ca'],
      phoneNumber: [phones[0]?.phoneNumber],
      street: [address.street],
      apartment: [address.apartment],
      province: [address.province],
      city: [address.city],
      code: [address?.code],
      country: ['Canada'],
    });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  closeModal() {
    this._matDialogRef.close();
  }

  getCountryByIso(value: string): any {
    // keep only canada for the moment
    return this.countries.length > 0 ? this.countries[0] : { code: '', name: '', flagImagePos: '' };
  }

  async onSubmit() {
    const userId = localStorage.getItem(constants.CURRENT_USER_ID);
    const updateduser = this.getUserFromFormBuilder();
    if (!this.profile.valid) {
      this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
      return;
    }
    const response = await this._userService.updateUserDetails(Number(userId), updateduser);
    if (response.body.statusCode === 204) {
      this.updateLocalUser.emit(this.profile.value);
      this._toastrService.showSuccess(constants.UPDATE_SUCCESSFULLY);
      this._matDialogRef.close();
    } else {
      this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
    }
  }

  dateFilter(date: Date | null): boolean {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const maxDateToPick = date || today;
    const mustBeAtLeast14YearsOld = new Date(year - constants.MINIMUM_AGE, month, day);

    return maxDateToPick < mustBeAtLeast14YearsOld;
  }

  private getUserFromFormBuilder(): UserRequestObject {
    const phone = new Phone({
      id: this?.data?.profile?.phones[0]?.id,
      phoneNumber: this?.profile?.value?.phoneNumber,
      phoneCode: this?.profile?.value?.phoneCode,
    });
    const address = new Address({
      id: this.data.profile.address.id,
      apartment: this?.profile?.value?.apartment,
      province: this?.profile?.value?.province,
      city: this?.profile?.value?.city,
      code: this?.profile?.value?.code,
      country: this?.profile?.value?.country,
      organization: null,
    });
    return new UserRequestObject({
      firstname: this.profile?.value?.firstname || '',
      lastname: this.profile?.value?.lastname || '',
      email: this.profile?.value?.email || '',
      dateofbirth: moment(this?.profile?.value?.dateofbirth).format(constants.DATE_FORMAT_YYYY_MM_DD),
      phones: [phone],
      address,
    });
  }
}
