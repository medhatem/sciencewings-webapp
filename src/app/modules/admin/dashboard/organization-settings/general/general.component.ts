import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ContactsService } from 'app/modules/admin/resolvers/contact.service';
import { CookieService } from 'ngx-cookie-service';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { countries as countriesData } from 'app/mock-api/apps/contacts/data';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';

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
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _coookies: CookieService,
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
      phoneLabel: '',
      type: '',
      direction: '',
      description: '',
    });

    this.form.setValue({
      ...this.form.value,
      name: this.currentOrganizations.name,
      email: this.currentOrganizations.email,
      type: this.currentOrganizations.type,
      direction: this.currentOrganizations.direction,
      description: this.currentOrganizations.description,
    });
    if (this.currentOrganizations.phone) {
      this.form.setValue({
        ...this.form.value,
        phoneCode: this.currentOrganizations.phone.phoneCode,
        phoneNumber: this.currentOrganizations.phone.phoneNumber,
        phoneLabel: this.currentOrganizations.phone.phoneLabel,
      });
    } else {
      this.form.setValue({
        ...this.form.value,
        phoneCode: 'fr',
        phoneNumber: '',
        phoneLabel: '',
      });
    }

    // Get the country telephone codes
    this._contactsService.countries$.pipe(takeUntil(this._unsubscribeAll)).subscribe((codes: any[]) => {
      this.countries = countriesData;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  onSubmit() {
    const data = { ...this.form.value };

    this.organizationService.updateOrganization(1, data).subscribe((response) => {
      if (response.body.statusCode === 204) {
        this.updateLocalOrganization.emit(this.form.value);
        this._toastrService.showSuccess('Updated Successfully');
      } else {
        this._toastrService.showError('Something went wrong!');
      }
    });
  }

  getCountryByIso(): any {
    return this.countries.find((country) => country.iso === this.form.value.phoneCode);
  }
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
