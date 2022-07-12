import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { lastValueFrom } from 'rxjs';
import { countryCanada } from 'app/mock-api/apps/contacts/data';
import { OrganizationLabels, OrganizationLabelsTranslation } from 'app/models/organizations/organization-lables.enum';
import { Member } from 'app/models/Member';

@Component({
  selector: 'member-profile-form',
  templateUrl: './member-profile-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MemberProfileFormComponent implements OnInit {
  profile: FormGroup;
  countries = countryCanada;
  labels = OrganizationLabels;
  labelsKeys = Object.keys(OrganizationLabels);
  labelsTranslation = OrganizationLabelsTranslation;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Member,
    public matDialogRef: MatDialogRef<MemberProfileFormComponent>,
    private _toastrService: ToastrService,
    private _formBuilder: FormBuilder,
    private _memberService: MemberService,
  ) {}

  ngOnInit(): void {
    this.profile = this._formBuilder.group({
      workEmail: [this.data.workEmail, [Validators.required, Validators.email]],
      name: [this.data.name, [Validators.required]],
      jobTitle: [this.data.jobTitle, []],
      gender: [this.data.gender, [Validators.required]],
      workPhone: [this.data.workPhone, []],
      label: ['', []],
      apartment: [this.data.address?.apartment, []],
      street: [this.data.address?.street, []],
      city: [this.data.address?.city, []],
      country: [this.data.address?.country, []],
      province: [this.data.address?.province, []],
      zipCode: [this.data.address?.code, []],
      ...this.data,
    });
  }

  saveProfileDetails() {}

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
}
