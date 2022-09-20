import { ActivatedRoute, Router } from '@angular/router';
import { Address, Phone } from 'app/models';
import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Organization } from 'app/models/organizations/organization';
import { OrganizationLabels, OrganizationLabelsTranslation } from 'app/models/organizations/organization-lables.enum';
import { OrganizationType, OrganizationTypeTrasnlation } from 'app/models/organizations/organization-type.enum';

import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { countryCanada } from 'app/mock-api/apps/contacts/data';
import { UserOrganizations } from 'app/models/organizations/user-organizations';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { countries as countriesData } from 'app/mock-api/apps/contacts/data';
import { ContactsService } from 'app/modules/admin/resolvers/contact.service';

@Component({
  selector: 'organization-form',
  templateUrl: './organization-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class OrganizationFormComponent implements OnInit {
  @Input() countries: any;
  formGroup: FormGroup;
  organizationTypesKeys = Object.keys(OrganizationType).map((key) => key);
  organizationType = OrganizationType;
  labels = OrganizationLabels;
  labelsKeys = Object.keys(OrganizationLabels);
  organizationTypeTrasnlation = OrganizationTypeTrasnlation;
  labelsTranslation = OrganizationLabelsTranslation;
  userOrganizations: UserOrganizations[] = [];
  hasOrganizations: boolean = true;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _formBuilder: FormBuilder,
    private _adminOrganizationsService: AdminOrganizationsService,
    private _toastrService: ToastrService,
    private _contactsService: ContactsService,
    private _changeDetectorRef: ChangeDetectorRef,

    private _route: ActivatedRoute,
    private _router: Router,
  ) {}

  ngOnInit() {
    const { userOrganizations = [] } = this._route.snapshot.data;
    this.userOrganizations = userOrganizations;
    const formGroupObj = {
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
      organizationType: ['', [Validators.required]],
    };

    // Get the country telephone codes
    this._contactsService.countries$.pipe(takeUntil(this._unsubscribeAll)).subscribe((codes: any[]) => {
      this.countries = countriesData;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });

    if (!this.userOrganizations?.length) {
      this.hasOrganizations = false;
      delete formGroupObj.parent;
    }
    this.formGroup = this._formBuilder.group(formGroupObj);
  }

  /**
   * 1 - Triggers getAllUserOrganizations, to update subscribers
   * 2 - Validate if the form data is valid first
   * 3 - create a new organization
   * 4 - redirect to dashboard page if success
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
      await lastValueFrom(this._adminOrganizationsService.getAllUserOrganizations());
      this._toastrService.showSuccess(constants.CREATE_ORGANIZATION_COMPLETED);
      this._router.navigate(['/', constants.MODULES_ROUTINGS_URLS.LANDING_PAGE]);
    } catch (error) {
      this._toastrService.showError(constants.CREATE_ORGANIZATION_FAILED);
    }
  }

  getCountryByIso(): any {
    // keep only canada for the moment
    return this.countries.length ? this.countries[0] : { code: '', name: '', flagImagePos: '' };
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
   *
   * fetchs the values in the formBuilder and returns a clean Organization object
   *
   * @returns Organization
   */
  private getOrganizationFromFormBuilder(): Organization {
    const { phoneNumber, phoneCode, labels, parent, organizationType } = this.formGroup.value;
    const phone = new Phone({ phoneNumber, phoneCode });
    const address = new Address({ ...this.formGroup.value });
    return new Organization({
      ...this.formGroup.value,
      addresses: [address],
      phones: [phone],
      labels: [labels],
      type: organizationType,
      parent,
    });
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
