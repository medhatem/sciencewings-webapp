import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ContactsService } from 'app/modules/admin/resolvers/contact.service';
import { CookieService } from 'ngx-cookie-service';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { countries as countriesData } from 'app/mock-api/apps/contacts/data';

@Component({
  selector: 'organization-settings-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  @Input() countries: any;
  form: FormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _coookies: CookieService,
    private _contactsService: ContactsService,
    private _changeDetectorRef: ChangeDetectorRef,
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
      note: '',
    });

    // Get the country telephone codes
    this._contactsService.countries$.pipe(takeUntil(this._unsubscribeAll)).subscribe((codes: any[]) => {
      this.countries = countriesData;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  onSubmit() {}

  getCountryByIso(): any {
    return this.countries.find((country) => country.iso === this.form.value.phoneCode);
  }
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
