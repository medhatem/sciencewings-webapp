import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { Address } from 'app/models/organizations/address';
import { Phone } from 'app/models/organizations/phone';
import moment from 'moment-timezone';

@Component({
  selector: 'organization-form',
  templateUrl: './organization-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class OrganizationFormComponent implements OnInit {
  @ViewChild(MatStepper) horizontalStepper: MatStepper;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  stepperForm: FormGroup;
  oragnization = new Organization();
  isSubOrganization = false;
  organizationLabels: IMatChipLabel[] = [];
  adminsEmailListLabels: IMatChipLabel[] = [];
  usersEmailListLabels: IMatChipLabel[] = [];
  countries = countries;
  organizationTypes = organizationTypes;
  timezoneList = moment.tz.names();

  constructor(
    private _formBuilder: FormBuilder,
    private _adminOrganizationsService: AdminOrganizationsService,
    private _toastrService: ToastrService,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const { parentId = '' } = this._route.snapshot.data;
    this.stepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        dealingType: [''],
        isSubOrganization: [this.isSubOrganization],
        parentId: [parentId],
        name: ['', [Validators.required]],
        adminContact: [''],
        direction: [''],
        email: ['', [Validators.required, Validators.email]],
        organizationType: ['', Validators.required],
        description: [''],
        timezone: ['America/Montreal', Validators.required],
        phoneNumber: [''],
        phoneCode: [''],
        phoneLabel: [''],
        labels: [this.organizationLabels],
      }),
      step2: this._formBuilder.group({
        appartement: [''],
        city: [''],
        code: [''],
        country: [''],
        province: [''],
        street: [''],
        department: [''],
        sector: [''],
        socialFacebook: [''],
        socialGithub: [''],
        socialInstagram: [''],
        socialLinkedin: [''],
        socialTwitter: [''],
        socialYoutube: [''],
      }),
      step3: this._formBuilder.group({
        adminsEmails: this._formBuilder.array([]),
        usersEmails: this._formBuilder.array([]),
      }),
    });
  }

  onDone() {
    this.createOrganization();
  }

  onDoneAndCreateNew() {
    if (this.stepperForm.valid) {
      this.createOrganization();
      this.horizontalStepper.reset();
    } else {
      this._toastrService.showError('', constants.CREATE_ORGANIZATION_FAILED);
      return;
    }
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

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  private createOrganization() {
    this.setOrganizationInfo();
    if (this.stepperForm.valid) {
      this._adminOrganizationsService.createOrganization(this.oragnization).subscribe({
        next: (result) => result,
        error: (err) => {
          this._toastrService.showError(err, constants.CREATE_ORGANIZATION_FAILED);
          return false;
        },
        complete: () => {
          this._toastrService.showSuccess('', constants.CREATE_ORGANIZATION_COMPLETED);
          this.stepperForm.reset();
          return true;
        },
      });
    }
  }

  private setOrganizationInfo() {
    const { step1, step2, step3 } = this.stepperForm.getRawValue();
    const phones = [new Phone({ ...step1 })];
    const address = new Address({ type: 'ORGANIZATION', ...step2 });
    const { adminsEmails = [], usersEmails = [] } = step3;
    this.adminsEmailListLabels = adminsEmails;
    this.usersEmailListLabels = usersEmails;
    this.oragnization = new Organization({ ...this.oragnization, phones, address, ...step1, ...step2 });
  }

  private validateEmail(email: string): boolean {
    return emailRegex.test(String(email).toLowerCase());
  }
}
