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
      name: '',
      email: ['', Validators.email],
      phoneCode: 'fr',
      phoneNumber: '',
      labels: [],
      type: '',
      direction: '',
      description: '',
    });

    this.form.setValue({
      ...this.form.value,
      name: this.form.value.name,
      email: this.form.value.email,
      type: this.form.value.type,
      labels: this.form.value.labels,
      direction: this.form.value.direction,
      description: this.form.value.description,
    });

    // Get the country telephone codes
    this._contactsService.countries$.pipe(takeUntil(this._unsubscribeAll)).subscribe((codes: any[]) => {
      this.countries = countriesData;

      // Mark for check
      this._changeDetectorRef.markForCheck();

      if (this.form.value.phone) {
        this.form.setValue({
          ...this.form.value,
          phoneCode: this.form.value.phone.phoneCode,
          phoneNumber: this.form.value.phone.phoneNumber,
          labels: this.form.value.phone.labels,
        });
      } else {
        this.form.setValue({
          ...this.form.value,
          phoneCode: 'fr',
          phoneNumber: '',
          labels: [this.labels],
        });
      }
    });
  }

  async onSubmit() {
    const data = { ...this.form.value };
    data.direction = this.form.value.direction.id;
    delete data.phoneCode;
    delete data.phoneNumber;
    delete data.labels;
    data.phones = [
      {
        id: this.form.value.id,
        phoneCode: this.form.value.phoneCode,
        phoneNumber: this.form.value.phoneNumber,
        labels: this.form.value.phone.labels,
      },
    ];
    const response = await this.organizationService.updateOrganization(1, data);
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
