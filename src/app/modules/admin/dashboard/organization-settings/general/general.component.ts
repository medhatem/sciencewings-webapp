import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ContactsService } from 'app/modules/admin/resolvers/contact.service';
import { Subject, takeUntil } from 'rxjs';
import { countries as countriesData } from 'app/mock-api/apps/contacts/data';
import { OrganizationLabels, OrganizationLabelsTranslation } from 'app/models/organizations/organization-lables.enum';

import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'organization-settings-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  @Input() currentOrganizations: any;
  @Output() updateLocalOrganization = new EventEmitter<string>();
  @Input() countries: any;
  form: FormGroup;
  labels = OrganizationLabels;
  phoneLabel = OrganizationLabels;
  labelsKeys = Object.keys(OrganizationLabels);
  labelsTranslation = OrganizationLabelsTranslation;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _contactsService: ContactsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private organizationService: AdminOrganizationsService,
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: this.currentOrganizations?.name || '',
      email: this.currentOrganizations?.email || '',
      phoneCode: (this.currentOrganizations?.phoneCode && ['', Validators.email]) || 'fr',
      phoneNumber: this.currentOrganizations?.phoneNumber || '',
      labels: this.currentOrganizations?.labels || '',
      type: this.currentOrganizations?.type || '',
      direction: this.currentOrganizations?.direction || '',
      description: this.currentOrganizations?.description || '',
    });

    // Get the country telephone codes
    this._contactsService.countries$.pipe(takeUntil(this._unsubscribeAll)).subscribe((codes: any[]) => {
      this.countries = countriesData;

      // Mark for check
      this._changeDetectorRef.markForCheck();

      if (this.form.value.phone) {
        this.form.setValue({
          ...this.form.value,
          phoneCode: this.currentOrganizations?.phone.phoneCode,
          phoneNumber: this.currentOrganizations?.phone.phoneNumber,
          labels: this.currentOrganizations?.phone.labels,
        });
      } else {
        this.form.setValue({
          ...this.form.value,
          phoneCode: 'fr',
          phoneNumber: '',
          labels: '',
        });
      }
    });
  }

  async onSubmit() {
    const orgId = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    const data = { ...this.form.value };
    data.direction = this.form.value.direction.id;
    delete data.phoneCode;
    delete data.phoneNumber;
    delete data.labels;
    data.phones = [
      {
        id: this.form.value.id,
        phoneCode: this.currentOrganizations?.phoneCode,
        phoneNumber: this.currentOrganizations?.phoneNumber,
        labels: this.currentOrganizations?.phone.labels,
      },
    ];
    const response = await this.organizationService.updateOrganization(Number(orgId), data);
    if (response.body.statusCode === 204) {
      this.updateLocalOrganization.emit(this.form.value);
      this._toastrService.showSuccess(constants.UPDATE_SUCCESSFULLY);
    } else {
      this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
    }
  }

  getCountryByIso(): any {
    return this.countries.find(({ iso }) => iso === this.form.value.phoneCode);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
