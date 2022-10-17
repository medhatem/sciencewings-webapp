import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { MatDialogRef } from '@angular/material/dialog';
import { Resource } from 'app/models/resources/resource';
import { Infrastructure } from 'app/models/infrastructures/infrastructure';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, map } from 'rxjs';
import { InfrastructureService } from 'app/modules/admin/resolvers/infrastructure/infrastructure.service';

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
  organizationInfrastructures: Infrastructure[] = [];
  infrastructures: number;

  constructor(
    public matDialogRef: MatDialogRef<ResourceProfileFormComponent>,
    private _resourceService: ResourceService,
    private _infrastructureService: InfrastructureService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    this.resourceForm = this._formBuilder.group({
      name: this._formBuilder.control('', [Validators.required]),
      resourceClass: this._formBuilder.control('', [Validators.required]),
      resourceType: this._formBuilder.control('', [Validators.required]),
      infrastructures: ['', [Validators.required]],
      description: [' '],
    });
    await this.getOrgInfrastructures();
    this.infrastructures = Number(localStorage.getItem(constants.CURRENT_INFRASTRUCTURE_ID));
  }

  getvalidationControls() {
    return this.resourceForm.controls;
  }
  async onSubmit() {
    this.submitted = true;
    if (this.resourceForm.invalid) {
      return;
    }
    const resource = this.getResourceFromFormBuilder();

    try {
      const orgId = this.getOrganizationIdFromLocalStorage();
      await this._resourceService.createResource(resource);
      await lastValueFrom(this._infrastructureService.getInfrastructure(orgId));
      this._toastrService.showSuccess(constants.CREATE_RESOURCE_COMPLETED);
      this.matDialogRef.close();
    } catch (res) {
      this._toastrService.showError(res.error.error);
    }
  }
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private async getOrgInfrastructures() {
    this.organizationInfrastructures = await lastValueFrom(this._infrastructureService.getOrgInfrastructures().pipe(map((r) => r.body.data)));
  }

  private getResourceFromFormBuilder(): Resource {
    return new Resource({
      ...this.resourceForm.value,
      organization: this.getOrganizationIdFromLocalStorage(),
      infrastructure: this.infrastructures,
    });
  }
  private getOrganizationIdFromLocalStorage(): number {
    return Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
  }
}
