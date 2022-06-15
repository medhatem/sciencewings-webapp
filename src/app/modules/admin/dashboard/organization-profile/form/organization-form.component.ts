import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { emailRegex } from 'app/shared/constants.regex';
import { Organization } from 'app/models/organizations/organization';
import { IMatChipLabel } from 'app/models/mat-ui/mat-chip-label.interface';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants, countries, organizationTypes } from 'app/shared/constants';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { Address, AddressType } from 'app/models/address';
import { Phone } from 'app/models/phone';
import moment from 'moment-timezone';
import { ContactsService } from 'app/modules/admin/resolvers/contact.service';
import { Subject, takeUntil } from 'rxjs';
import { countries as countriesData } from 'app/mock-api/apps/contacts/data';

@Component({
  selector: 'organization-form',
  templateUrl: './organization-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class OrganizationFormComponent implements OnInit {
  @Input() countries: any;
  @ViewChild(MatStepper) horizontalStepper: MatStepper;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  form: FormGroup;
  oragnization = new Organization();
  isSubOrganization = false;
  organizationLabels: IMatChipLabel[] = [];
  adminsEmailListLabels: IMatChipLabel[] = [];
  usersEmailListLabels: IMatChipLabel[] = [];
  organizationTypes = organizationTypes;
  timezoneList = moment.tz.names();
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _formBuilder: FormBuilder,
    private _adminOrganizationsService: AdminOrganizationsService,
    private _toastrService: ToastrService,
    private _route: ActivatedRoute,
    private _contactsService: ContactsService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const { parentId = null } = this._route.snapshot.data;
    this.form = this._formBuilder.group({
      type: [''],
      isSubOrganization: [this.isSubOrganization],
      parentId: [parentId],
      name: ['', [Validators.required]],
      adminContact: [1],
      direction: [1],
      email: ['', [Validators.required, Validators.email]],
      organizationType: ['', Validators.required],
      description: [''],
      timezone: ['America/Montreal', Validators.required],
      phoneNumber: [''],
      phoneCode: ['fr'],
      phoneLabel: [''],
      labels: [this.organizationLabels],
      apartment: [''],
      city: [''],
      code: [''],
      country: [''],
      province: [''],
      street: [''],
      // department: [''],
      // sector: [''],
      socialFacebook: [''],
      socialGithub: [''],
      socialInstagram: [''],
      socialLinkedin: [''],
      socialTwitter: [''],
      socialYoutube: [''],
      adminsEmails: this._formBuilder.array([]),
      usersEmails: this._formBuilder.array([]),
    });
    // Get the country telephone codes
    this._contactsService.countries$.pipe(takeUntil(this._unsubscribeAll)).subscribe((codes: any[]) => {
      this.countries = countriesData;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  onDone() {
    this.createOrganization();
  }

  onDoneAndCreateNew() {
    if (this.form.valid) {
      this.createOrganization();
      this.horizontalStepper.reset();
    } else {
      console.log('!this.form.valid');
      this.getFormValidationErrors();

      this._toastrService.showError(constants.CREATE_ORGANIZATION_FAILED);
      return;
    }
  }

  getFormValidationErrors() {
    Object.keys(this.form.controls).forEach((key) => {
      const controlErrors = this.form.get(key).errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  addItemMatChip(matItemLabelList: IMatChipLabel[], event: MatChipInputEvent, isEmail: boolean = false): void {
    const value = (event.value || '').trim();
    const invalid = isEmail && !this.validateEmail(value);
    if (value) {
      matItemLabelList.push({ value, invalid });
    }
    event.chipInput?.clear();
  }

  removeItemMatChip(matItemLabelList: IMatChipLabel[], matItemLabelToRemove: IMatChipLabel): void {
    const index = matItemLabelList.indexOf(matItemLabelToRemove);
    if (index >= 0) {
      matItemLabelList.splice(index, 1);
    }
  }

  onSubmit() {}

  getCountryByIso(): any {
    return this.countries.find((country) => country.iso === this.form.value.phoneCode);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  private async createOrganization(): Promise<boolean> {
    console.log('createOrganization');

    this.setOrganizationInfo();
    if (this.form.valid) {
      try {
        const result = await this._adminOrganizationsService.createOrganization(this.oragnization);
        this._toastrService.showSuccess(constants.CREATE_ORGANIZATION_COMPLETED);
        return result;
      } catch (error) {
        console.log('createOrganization', { error });
        this._toastrService.showError(constants.CREATE_ORGANIZATION_FAILED);
        return false;
      }
    }
  }

  private setOrganizationInfo() {
    this.oragnization = new Organization({
      description: this.form.value.description,
      department: this.form.value.department,
      sector: this.form.value.sector,
      adminContact: this.form.value.adminContact,
      direction: this.form.value.direction,
      members: this.form.value.members,
      socialFacebook: this.form.value.socialFacebook,
      socialGithub: this.form.value.socialGithub,
      socialInstagram: this.form.value.socialInstagram,
      socialLinkedin: this.form.value.socialLinkedin,
      socialTwitter: this.form.value.socialTwitter,
      socialYoutube: this.form.value.socialYoutube,
      name: this.form.value.name,
      type: this.form.value.organizationType,
      email: this.form.value.email,
      parentId: this.form.value.parentId,
      labels: [],
      addresses: [
        {
          appartement: this.form.value.apartment,
          city: this.form.value.city,
          code: this.form.value.code,
          country: this.form.value.country,
          province: this.form.value.province,
          street: this.form.value.street,
          type: 'ORGANIZATION',
        },
      ],
      phones: [
        {
          phoneCode: this.form.value.phoneCode,
          phoneLabel: this.form.value.phoneLabel,
          phoneNumber: this.form.value.phoneNumber,
        },
      ],
    });
  }

  private validateEmail(email: string): boolean {
    return emailRegex.test(String(email).toLowerCase());
  }
}
