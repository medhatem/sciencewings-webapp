import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { Country } from 'app/models/country.interface';
import { User, userPhone } from 'app/models/user';
import { lastValueFrom, map } from 'rxjs';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { Address } from 'app/models/address';
import { ActivatedRoute } from '@angular/router';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  @Input() id: number;
  @Input() user: User;
  @Input() countries: Country[];
  userForm: FormGroup;
  profile: User;
  data: any;
  adress: string;
  phoneNumber: string;
  userPhone: userPhone[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private _route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    this.data = await this.getUserProfile();
    this.adress = this.formatAddress(this?.profile?.addresses[0]);
    // this.phoneNumber = this.profile?.phones[0]?.phoneNumber;
    this._changeDetectorRef.markForCheck();
  }

  async getUserProfile() {
    const { userId } = this._route.snapshot.params;
    this.id = userId;
    try {
      this.profile = await lastValueFrom(
        this._userService.getUserByKeycloak(this.id).pipe(map((profile) => new User((profile.body.data[0] as any) || {}))),
      );
      this._changeDetectorRef.markForCheck();
    } catch (error) {
      this._toastrService.showWarning('ORGANIZATION.MEMBERS.PROFILE_LOADING_ERROR');
    }
  }

  private formatAddress(address: Address): string {
    const { apartment = '', street = '', city = '', province = '', country = '', code = '' } = address;
    const addressWithoutApp = `${street}, ${city}, ${province}, ${country}, ${code}`;
    return apartment ? `${apartment}, ${addressWithoutApp}` : addressWithoutApp;
  }
}
