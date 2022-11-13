import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { Country } from 'app/models/country.interface';
import { User, userPhone } from 'app/models/user';
import { lastValueFrom, map, Subject } from 'rxjs';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { Address, GetAddress } from 'app/models/address';
import { constants } from 'app/shared/constants';
import { EditUserInfoComponent } from './edit-user-info/edit-user-info.component';
import { Organization } from 'app/models/organizations/organization';
import moment from 'moment';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @Input() id: number;
  @Input() user: User;
  @Input() countries: Country[];
  openedDialogRef: any;
  userForm: FormGroup;
  profile: User;
  data: any;
  adress: string;
  phoneNumber: any;
  dateofbirth: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _userService: UserService,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
  ) {}

  async ngOnInit() {
    this.data = await this.getUserProfile();
    this.dateofbirth = await this.formateDate();
    this.adress = this.formatAddress(this?.profile?.addresses[0]);
    this.phoneNumber = this.profile?.phones[0]?.phoneNumber;
    this._changeDetectorRef.markForCheck();
  }

  async getUserProfile() {
    this.id = Number(localStorage.getItem(constants.CURRENT_USER_ID));
    const userId = this.id;
    try {
      this.profile = await lastValueFrom(
        this._userService.getUserByKeycloak(userId).pipe(map((profile) => new User((profile?.body.data[0] as any) || {}))),
      );
      this._changeDetectorRef.markForCheck();
    } catch (error) {
      this._toastrService.showWarning('ORGANIZATION.MEMBERS.PROFILE_LOADING_ERROR');
    }
  }

  async editUserInformation() {
    this.id = Number(localStorage.getItem(constants.CURRENT_USER_ID));
    this.openedDialogRef = this._matDialog.open(EditUserInfoComponent, {
      data: { profile: this.profile, id: this.id },
    });
    this.openedDialogRef.afterClosed().subscribe(async () => {
      await this.ngOnInit();
    });
    this._toastrService.showInfo(constants.COMPLETING_MEMBER_PROFILE_INFO);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  private formatAddress(address: GetAddress): string {
    const { apartment = '', street = '', city = '', province = '', country = '', code = '' } = address;
    const addressWithoutApp = `${street}, ${city}, ${province}, ${country}, ${code}`;
    return apartment ? `${apartment}, ${addressWithoutApp}` : addressWithoutApp;
  }

  private async formateDate() {
    return (this.dateofbirth = moment(this?.profile?.dateofbirth).format(constants.DATE_FORMAT_YYYY_MM_DD));
  }
}
