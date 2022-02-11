import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Label {
  name: string;
}

@Component({
  selector: 'organization-form',
  templateUrl: './organization-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class OrganizationFormComponent implements OnInit {
  stepperForm: FormGroup;
  isSubOrganization = false;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  organizationLabels: Label[] = [{ name: 'label 01' }, { name: 'label 01' }];
  selectedCar: number;
  admins = [
    { id: 1, name: 'Mostapha Abbad' },
    { id: 2, name: 'Administrateur 00002' },
    { id: 3, name: 'Administrateur 00003' },
    { id: 4, name: 'Administrateur 00004' },
    { id: 5, name: 'Administrateur 00005' },
    { id: 6, name: 'Administrateur 00006' },
  ];
  users = [
    { id: 1, name: 'Mostapha Abbad' },
    { id: 2, name: 'Utilisateur 00002' },
    { id: 3, name: 'Utilisateur 00003' },
    { id: 4, name: 'Utilisateur 00004' },
    { id: 5, name: 'Utilisateur 00005' },
    { id: 6, name: 'Utilisateur 00006' },
  ];
  /**
   * Constructor
   */
  constructor(private _formBuilder: FormBuilder) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
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
        admins: [''],
        users: [''],
      }),
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.organizationLabels.push({ name: value });
    }

    // Clear the input value
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    event.chipInput!.clear();
  }

  remove(fruit: Label): void {
    const index = this.organizationLabels.indexOf(fruit);

    if (index >= 0) {
      this.organizationLabels.splice(index, 1);
    }
  }
}
