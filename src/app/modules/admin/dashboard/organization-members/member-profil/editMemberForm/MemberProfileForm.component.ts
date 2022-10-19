import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { lastValueFrom } from 'rxjs';
import { countryCanada } from 'app/mock-api/apps/contacts/data';
import { OrganizationLabels, OrganizationLabelsTranslation } from 'app/models/organizations/organization-lables.enum';
import { Member } from 'app/models/Member';
import { Phone } from 'app/models/phone';
import { Address } from 'app/models/address';
import { MemberGenders, MemberGenderTranslation } from 'app/models/members/member-gender.enum';
import { MemberLabels } from 'app/models/members/member-lables.enum';
import { constants } from 'app/shared/constants';

export interface DialogData {
  idOrg: number;
  userId: number;
  profile: Member;
}

@Component({
  selector: 'member-profile-form',
  templateUrl: './member-profile-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MemberProfileFormComponent implements OnInit {
  profile: FormGroup;
  countries = countryCanada;
  gender = MemberGenders;
  // gendersKeys = Object.keys(MemberGenders);
  gendersKeys = Object.keys(MemberGenders).map((key) => key);
  gendersTranslation = MemberGenderTranslation;
  phoneLabel = OrganizationLabels;
  labelsKeys = Object.keys(OrganizationLabels);
  labelsTranslation = OrganizationLabelsTranslation;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _matDialogRef: MatDialogRef<MemberProfileFormComponent>,
    private _toastrService: ToastrService,
    private _formBuilder: FormBuilder,
    private _memberService: MemberService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const {
      workEmail,
      name = '',
      jobTitle = '',
      gender = '',
      workPhone = { phoneCode: '', phoneLabel: '', phoneNumber: '' },
      address = { apartment: '', code: '', city: '', country: '', province: '', street: '' },
    } = this.data.profile;
    this.profile = this._formBuilder.group({
      workEmail: [workEmail, [Validators.required, Validators.email]],
      name: [name, [Validators.required]],
      jobTitle: [jobTitle, []],
      gender: [gender],
      phoneNumber: [workPhone?.phoneNumber, [Validators.required]],
      phoneCode: [workPhone?.phoneCode, [Validators.required]],
      phoneLabel: [workPhone?.phoneLabel],
      apartment: [address?.apartment, []],
      street: [address?.street, []],
      city: [address?.city, []],
      country: [address?.country, []],
      province: [address?.province, []],
      code: [address?.code, []],
    });
  }

  async saveProfileDetails() {
    if (!this.profile.valid) {
      this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
      return;
    }
    try {
      await lastValueFrom(
        this._memberService.updateMember(this.data.idOrg, this.data.userId, this.getMemberFormBuilder(this.data.idOrg, this.data.userId)),
      );
      this._cdr.markForCheck();
      this.closeModal();
    } catch (error) {
      this._toastrService.showWarning('ORGANIZATION.MEMBERS.PROFILE_LOADING_ERROR');
    }
  }

  getCountryByIso(value: string): any {
    // keep only canada for the moment
    return this.countries.length > 0 ? this.countries[0] : { code: '', name: '', flagImagePos: '' };
  }

  /**
   *
   * Used to track for loops elements by either their id or index
   *
   * @param index index of the element to track
   * @param item to track
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  closeModal() {
    this._matDialogRef.close();
  }

  private getMemberFormBuilder(orgId: number, userId: number): Member {
    const { phoneNumber, phoneCode, phoneLabel } = this.profile.value;
    const phone = new Phone({ phoneNumber, phoneCode, phoneLabel });
    const address = new Address({ ...this.profile.value });
    return new Member({
      ...this.profile.value,
      organization: orgId,
      user: userId,
      membership: this.data.profile.membership,
      memberType: this.data.profile.memberType,
      workPhone: phone,
      address,
    });
  }
}
