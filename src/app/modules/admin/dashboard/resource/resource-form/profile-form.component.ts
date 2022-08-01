import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { lastValueFrom } from 'rxjs';
import { constants } from 'app/shared/constants';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResourceProfileFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<ResourceProfileFormComponent>,
    private _resourceService: ResourceService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      resourceType: ['equipement', Validators.required],
      resourceClass: ['reservable', Validators.required],
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const _resource = {
      name: this.form.value.name,
      description: this.form.value.description,
      active: true,
      organization: 1,
      user: 1,
      resourceType: this.form.value.resourceType,
      resourceClass: this.form.value.resourceClass,
    };
    try {
      const response = await lastValueFrom(this._resourceService.createResource(_resource));
      this.form.reset({
        name: '',
        description: '',
        resourceType: 'equipement',
        resourceClass: 'reservable',
      });
    } catch (error) {
      this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
    }
  }
}
