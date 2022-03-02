import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// TODO: Use backend service instead of mock api service

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent implements OnInit {
  data: any;
  countries: any;
  userForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _http: HttpClient,
    private _formBuilder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._prepareUserData();
    this._prepareCountries();

    this.userForm = this._formBuilder.group({
      name: [this.data.user.name],
      title: [this.data.user.title],
      company: [this.data.user.company],
      emails: [this.data.user.emails],
    });
  }

  private _prepareUserData() {
    this.data = this._route.snapshot.data;
  }

  private _prepareCountries() {
    // TODO: Use backend service instead of mock api
    this._http.get('api/apps/contacts/countries').subscribe((countries) => (this.countries = countries));
  }

  getCountryByIso(iso: string) {
    if (this.countries) {
      return this.countries.find((country) => country.iso === iso);
    }
  }

  uploadAvatar(fileList: FileList): void {
    if (!fileList.length) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];

    if (!allowedTypes.includes(file.type)) {
      return;
    }

    // TODO: Use backend service instead of mock api service
    /*
    this._httpClient.post(
      'api/apps/contacts/avatar',
      {
        id,
        avatar,
      },
      {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': avatar.type,
        },
      },
    );
    */
  }

  addEmailField(): void
    {
        // Create an empty email form group
        const emailFormGroup = this._formBuilder.group({
            email: [''],
            label: ['']
        });

        // Add the email form group to the emails form array
        (this.userForm.get('emails') as FormArray).push(emailFormGroup);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
}
