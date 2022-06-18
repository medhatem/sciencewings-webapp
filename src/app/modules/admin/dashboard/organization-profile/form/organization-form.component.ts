import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Organization, UserOrganizations } from 'app/models/organizations/organization';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { CookieService } from 'ngx-cookie-service';
import { countryCanada } from 'app/mock-api/apps/contacts/data';
import { OrganizationType, OrganizationTypeTrasnlation } from 'app/models/organizations/organization-type.enum';
import { Address, Phone } from 'app/models';

@Component({
  selector: 'organization-form',
  templateUrl: './organization-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class OrganizationFormComponent implements OnInit {
  countries = countryCanada;
  formGroup: FormGroup;
  organizationTypesKeys = Object.keys(OrganizationType).map((key) => key);
  OrganizationType = OrganizationType;
  OrganizationTypeTrasnlation = OrganizationTypeTrasnlation;
  userOrganizations: UserOrganizations[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _adminOrganizationsService: AdminOrganizationsService,
    private _toastrService: ToastrService,
    private _cookieService: CookieService,
  ) {}

  ngOnInit() {
    this.getUserOrganizations();
    this.formGroup = this._formBuilder.group({
      type: [this.OrganizationType.PUBLIC],
      parentId: [],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      phoneCode: ['+1'],
      secondPhoneNumber: ['', [Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      secondPhoneCode: ['+1'],
      apartment: [''],
      city: [''],
      code: [''],
      country: [''],
      province: [''],
      street: [''],
    });
  }

  async onSubmit() {
    if (this.formGroup.valid) {
      const organization = this.getOrganizationFromFormBuilder();
      try {
        await this._adminOrganizationsService.createOrganization(organization);
        this._toastrService.showSuccess(constants.CREATE_ORGANIZATION_COMPLETED);
      } catch (error) {
        this._toastrService.showError(constants.CREATE_ORGANIZATION_FAILED);
      }
    } else {
      this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
    }
  }

  getCountryByIso(value: string): any {
    // keep only canada for the moment
    return this.countries[0];
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  private getUserOrganizations() {
    const userId = this._cookieService.get(constants.CURRENT_USER_ID);
    this._adminOrganizationsService
      .getUserOrganizations(Number(userId))
      .then((organizations = []) => {
        this.userOrganizations = organizations;
      })
      .catch((err) => {
        this.userOrganizations = [];
        this._toastrService.showInfo('SWITCH_ORGANIZATIONS_LOAD_FAILED');
      });
  }

  private getOrganizationFromFormBuilder(): Organization {
    const { phoneNumber, phoneCode, secondPhoneNumber, secondPhoneCode } = this.formGroup.value;
    const phone = new Phone({ phoneNumber, phoneCode });
    const secondPhone = new Phone({ phoneNumber: secondPhoneNumber, phoneCode: secondPhoneCode });
    const address = new Address({ ...this.formGroup.value });
    return new Organization({ ...this.formGroup.value, addresses: [address], phones: [phone, secondPhone] });
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
