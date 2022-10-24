import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationLabels } from 'app/models/organizations/organization-lables.enum';
import { Phone } from 'app/models';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { UpdateOrganization } from 'app/models/organizations/organization';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { OrganizationMembers } from 'app/models/members/member';
import { countryCanada } from 'app/mock-api/apps/contacts/data';
import { lastValueFrom, map } from 'rxjs';

@Component({
  selector: 'organization-settings-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit, AfterViewInit {
  @Input() currentOrganizations: any;
  @Input() organization: any;
  // @Input() orgId: any;
  @Output() updateLocalOrganization = new EventEmitter<string>();
  countries = countryCanada;

  form: FormGroup;
  phoneLabel = OrganizationLabels;
  hasOrganizations: boolean = true;
  userOrganizations: any[] = [];
  organizationMembers: OrganizationMembers[];
  labelsKeys = Object.keys(OrganizationLabels);

  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private organizationService: AdminOrganizationsService,
    private _memberService: MemberService,
    private _cdf: ChangeDetectorRef,
  ) {}

  async ngOnInit(): Promise<void> {
    // const orgId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    // this.organization = await lastValueFrom(this.organizationService.getOrgOrganizationById(orgId).pipe(map((r) => r.body.data)));
    // console.log('Organization================', this.organization);
    this.getMembers();
    this.getOrganizations();
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneCode: ['ca', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      type: ['', [Validators.required]],
      parent: '',
      owner: ['', [Validators.required]],
      description: '',
    });
  }

  async ngAfterViewInit(): Promise<any> {
    const orgId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    this.organization = await lastValueFrom(this.organizationService.getOrgOrganizationById(orgId).pipe(map((r) => r.body.data)));
    this._cdf.markForCheck();
    this.form.setValue({
      name: this.organization.name || '',
      email: this?.organization.email || '',
      phoneCode: this?.organization.phone?.phoneCode || 'fr',
      phoneNumber: this?.organization.phone?.phoneNumber || '',
      type: this?.organization.type || '',
      parent: this?.organization.parent?.id || '',
      owner: this?.organization.owner?.id || '',
      description: this?.organization.description || '',
    });
  }
  getCountryByIso(): any {
    // keep only canada for the moment
    return this.countries.length > 0 ? this.countries[0] : { code: '', name: '', flagImagePos: '' };
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  async onSubmit() {
    const orgId = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    const updatedOrganization = this.getOrganizationFromFormBuilder();
    if (!this.form.valid) {
      this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
      return;
    }

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

  private getOrganizations() {
    const userId = Number(localStorage.getItem(constants.CURRENT_USER_ID));
    return this.organizationService
      .getUserOrganizations(userId)
      .then((resolve) => (this.userOrganizations = resolve))
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
      name: this.form.value?.name || this.organization?.name,
      email: this.form.value?.email || this.organization?.email,
      phone: phone,
      type: this.form.value?.type || this.organization?.type,
      parent: this.form.value?.parent || this.organization?.parent?.id,
      owner: this.form.value?.owner || this.organization?.owner.id,
      description: this.form.value?.description || this.organization?.description,
    });
  }
}
