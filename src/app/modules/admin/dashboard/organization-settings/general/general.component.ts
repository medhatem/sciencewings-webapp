import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationLabels, OrganizationLabelsTranslation } from 'app/models/organizations/organization-lables.enum';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';
import { Address, Phone } from 'app/models';

import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { ContactsService } from 'app/modules/admin/resolvers/contact.service';
import { Organization, UpdateOrganization } from 'app/models/organizations/organization';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { countries as countriesData } from 'app/mock-api/apps/contacts/data';
import { UserOrganizations } from 'app/models/organizations/user-organizations';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { OrganizationMembers } from 'app/models/members/member';
@Component({
  selector: 'organization-settings-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit, AfterViewInit {
  @Input() currentOrganizations: any;
  @Output() updateLocalOrganization = new EventEmitter<string>();
  @Input() countries: any;
  @Input() organization: any;

  form: FormGroup;
  labels = OrganizationLabels;
  phoneLabel = OrganizationLabels;
  labelsKeys = Object.keys(OrganizationLabels);
  labelsTranslation = OrganizationLabelsTranslation;
  hasOrganizations: boolean = true;
  userOrganizations: UserOrganizations[] = [];
  organizationMembers: OrganizationMembers[];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _contactsService: ContactsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private organizationService: AdminOrganizationsService,
    private _route: ActivatedRoute,
    private _memberService: MemberService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.getMembers();

    this.form = this._formBuilder.group({
      name: '',
      email: '',
      phoneCode: 'fr',
      phoneNumber: '',
      phoneLabel: '',
      type: '',
      parent: [],
      owner: '',
      description: '',
    });

    // Get the country telephone codes
    this._contactsService.countries$.pipe(takeUntil(this._unsubscribeAll)).subscribe((codes: any[]) => {
      this.countries = countriesData;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  async ngAfterViewInit(): Promise<void> {
    this.form.setValue({
      name: this.organization?.name || '',
      email: this.organization?.email || '',
      phoneCode: this.organization?.phone?.phoneCode || 'fr',
      phoneNumber: this.organization?.phone?.phoneNumber || '',
      phoneLabel: this.organization?.phone?.phoneLabel || '',
      type: this.organization?.type || '',
      parent: this.organization?.parent || '',
      owner: this.organization?.owner?.id || '',
      description: this.organization?.description || '',
    });
  }
  getCountryByIso(): any {
    return this.countries.find(({ iso }) => iso === this.form.value.phoneCode);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  async onSubmit() {
    const orgId = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    const updatedOrganization = this.getOrganizationFromFormBuilder();

    const response = await this.organizationService.updateOrganization(Number(orgId), updatedOrganization);
    if (response.body.statusCode === 204) {
      this.updateLocalOrganization.emit(this.form.value);
      this._toastrService.showSuccess(constants.UPDATE_SUCCESSFULLY);
    } else {
      this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
    }
  }

  private getMembers() {
    const idOrg = this.getOrganizationIdFromLocalStorage();
    return this._memberService
      .getMembersByOrgId(idOrg)
      .then((resolve) => (this.organizationMembers = resolve))
      .catch(() => {
        this._toastrService.showInfo('GET_MEMBERS_LOAD_FAILED');
      });
  }

  private getOrganizationIdFromLocalStorage(): number {
    return Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
  }
  private getOrganizationFromFormBuilder(): UpdateOrganization {
    const phone = new Phone({ phoneNumber: this.form.value?.phoneNumber, phoneCode: this.form.value?.phoneCode, phoneLabel: 'Organization' });
    return new UpdateOrganization({
      name: this.form.value?.name || this.organization.name,
      email: this.form.value?.email || this.organization.email,
      phone: phone,
      type: this.form.value?.type || this.organization.type,
      parent: this.form.value?.parent || this.organization.parent,
      owner: this.form.value?.owner || this.organization.owner.id,
      description: this.form.value?.description || this.organization.description,
    });
  }
}
