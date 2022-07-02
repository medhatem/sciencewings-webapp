import { Address, Phone } from 'app/models';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Organization, UserOrganizations } from 'app/models/organizations/organization';
import { OrganizationLabels, OrganizationLabelsTranslation } from 'app/models/organizations/organization-lables.enum';
import { OrganizationType, OrganizationTypeTrasnlation } from 'app/models/organizations/organization-type.enum';

import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { countryCanada } from 'app/mock-api/apps/contacts/data';

@Component({
  selector: 'organization-form',
  templateUrl: './organization-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class OrganizationFormComponent implements OnInit {
  countries = countryCanada;
  formGroup: FormGroup;
  organizationTypesKeys = Object.keys(OrganizationType).map((key) => key);
  organizationType = OrganizationType;
  labels = OrganizationLabels;
  labelsKeys = Object.keys(OrganizationLabels);
  organizationTypeTrasnlation = OrganizationTypeTrasnlation;
  labelsTranslation = OrganizationLabelsTranslation;
  userOrganizations: UserOrganizations[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _adminOrganizationsService: AdminOrganizationsService,
    private _toastrService: ToastrService,
    private _cookieService: CookieService,
  ) {}

  async ngOnInit() {
    this.formGroup = this._formBuilder.group({
      parent: [],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      phoneCode: ['+1'],
      secondPhoneCode: ['+1'],
      apartment: [''],
      city: ['', [Validators.required]],
      code: ['', [Validators.required]],
      country: ['', [Validators.required]],
      province: ['', [Validators.required]],
      street: ['', [Validators.required]],
      labels: [],
      type: ['', [Validators.required]],
    });
    this.userOrganizations = await this.getUserOrganizations();
  }

  /**
   * create a new organization
   * Validate if the form data is valid first
   *
   */
  async onSubmit() {
    if (!this.formGroup.valid) {
      this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
      return;
    }

    const organization = this.getOrganizationFromFormBuilder();
    try {
      await this._adminOrganizationsService.createOrganization(organization);
      this._toastrService.showSuccess(constants.CREATE_ORGANIZATION_COMPLETED);
    } catch (error) {
      this._toastrService.showError(constants.CREATE_ORGANIZATION_FAILED);
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

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * retrieves all organizations owned by the current user
   */
  private async getUserOrganizations() {
    const userId = localStorage.getItem(constants.CURRENT_USER_ID);
    try {
      return await this._adminOrganizationsService.getUserOrganizations(Number(userId));
    } catch (error) {
      this.userOrganizations = [];
      this._toastrService.showInfo('SWITCH_ORGANIZATIONS_LOAD_FAILED');
    }
  }

  private getOrganizationFromFormBuilder(): Organization {
    const { phoneNumber, phoneCode, labels, type } = this.formGroup.value;
    const phone = new Phone({ phoneNumber, phoneCode });
    const address = new Address({ ...this.formGroup.value });
    return new Organization({ ...this.formGroup.value, addresses: [address], phones: [phone], labels: [labels], type });
  }

  // ****************************** code for labels that we will need later on ****************************** //
  //
  // organizationLabels: IMatChipLabel[] = [];
  // readonly separatorKeysCodes = [ENTER, COMMA] as const;
  //
  // addItemMatChip(matItemLabelList: IMatChipLabel[], event: MatChipInputEvent, isEmail: boolean = false): void {
  //   const value = (event.value || '').trim();
  //   const invalid = isEmail && !this.validateEmail(value);
  //   if (value) {
  //     matItemLabelList.push({ value, invalid });
  //   }
  //   event.chipInput?.clear();
  // }
  //
  // removeItemMatChip(matItemLabelList: IMatChipLabel[], matItemLabelToRemove: IMatChipLabel): void {
  //   const index = matItemLabelList.indexOf(matItemLabelToRemove);
  //   if (index >= 0) {
  //     matItemLabelList.splice(index, 1);
  //   }
  // }
  // ********************************************************************************************************** //
}
