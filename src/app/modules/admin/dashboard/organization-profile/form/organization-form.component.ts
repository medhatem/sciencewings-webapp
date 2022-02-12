import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { emailRegex } from 'app/shared/constants.regex';
import { IOragnization } from 'app/models/organizations/organization.interface';
import { Organization } from 'app/models/organizations/organization';
import { IMatChipLabel } from 'app/models/mat-ui/mat-chip-label.interface';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'organization-form',
  templateUrl: './organization-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class OrganizationFormComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  stepperForm: FormGroup;
  oragnization: IOragnization;
  isSubOrganization = false;
  organizationLabels: IMatChipLabel[] = [];
  adminsEmailListLabels: IMatChipLabel[] = [];
  usersEmailListLabels: IMatChipLabel[] = [];
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _adminOrganizationsService: AdminOrganizationsService,
    private _toastrService: ToastrService,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.oragnization = new Organization();
    // Horizontal stepper form
    this.stepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        dealingType: ['', [Validators.required]],
        isSubOrganization: [''],
        subOrganization: [''],
        name: ['', [Validators.required]],
        organizationNumber: [''],
        email: ['', [Validators.required, Validators.email]],
        organizationType: ['', Validators.required],
        description: [''],
        phoneNumber: [''],
        labels: [''],
      }),
      step2: this._formBuilder.group({
        apartNumber: [''],
        about: [''],
        streetNumber: [''],
        street: [''],
        country: [''],
        province: [''],
        postalCode: [''],
        department: [''],
        sector: ['', Validators.required],
        facebook: [''],
        linkedin: [''],
        twitter: [''],
        other: [''],
      }),
      step3: this._formBuilder.group({
        adminsEmails: this._formBuilder.array([]),
        usersEmails: this._formBuilder.array([]),
      }),
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

  private createOrganization() {
    this._adminOrganizationsService.createOrganization(this.oragnization).subscribe({
      next: (resOrganization) => resOrganization,
      error: (err) => this._toastrService.showError(err, constants.CREATE_ORGANIZATION_FAILED),
      complete: () => this._toastrService.showError('', constants.CREATE_ORGANIZATION_COMPLETED),
    });
  }

  private validateEmail(email: string): boolean {
    return emailRegex.test(String(email).toLowerCase());
  }
}
