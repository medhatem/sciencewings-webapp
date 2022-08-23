import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { MatDialogRef } from '@angular/material/dialog';
import { Resource } from 'app/models/resources/resource';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResourceProfileFormComponent implements OnInit {
  @Input() resource: any;
  resourceForm: FormGroup;
  submitted = false;

  constructor(
    public matDialogRef: MatDialogRef<ResourceProfileFormComponent>,
    private _resourceService: ResourceService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
  ) {}
  get validationControls() {
    return this.resourceForm.controls;
  }
  ngOnInit(): void {
    this.resourceForm = this._formBuilder.group({
      name: ['', Validators.required],
      resourceClass: ['reservable', Validators.required],
      resourceType: ['equipement', Validators.required],
      description: [''],
    });
  }

  async onSubmit() {
    // this.submitted = true;
    if (this.resourceForm.invalid) {
      return;
    }
    const resource = this.getResourceFromFormBuilder();
    // const _resource = {
    //   name: this.resourceForm.value.name,
    //   description: this.resourceForm.value.description,
    //   active: true,
    //   organization: 1,
    //   user: 1,
    //   resourceType: this.resourceForm.value.resourceType,
    //   resourceClass: this.resourceForm.value.resourceClass,
    // };
    try {
      await this._resourceService.createResource(resource);
      this._toastrService.showSuccess(constants.CREATE_RESOURCE_COMPLETED);
      this.matDialogRef.close();
      // const response = await lastValueFrom(this._resourceService.createResource(_resource));
      // this.resourceForm.reset({
      //   name: '',
      //   description: '',
      //   resourceType: 'equipement',
      //   resourceClass: 'reservable',
      // });
    } catch (res) {
      this._toastrService.showError(res.error.error);
    }
  }
  private getResourceFromFormBuilder(): Resource {
    return new Resource({ ...this.resourceForm.value, timezone: 1, organization: this.getOrganizationIdFromLocalStorage() });
  }

  private getOrganizationIdFromLocalStorage(): number {
    return Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
  }
}
