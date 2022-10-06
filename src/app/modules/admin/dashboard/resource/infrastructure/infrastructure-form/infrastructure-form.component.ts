import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { OrganizationMembers } from 'app/models/members/member';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { constants } from 'app/shared/constants';
import { InfrastructureService } from 'app/modules/admin/resolvers/infrastructure/infrastructure.service';
import { Infrastructure } from 'app/models/infrastructures/infrastructure';
import { lastValueFrom, map } from 'rxjs';
@Component({
  selector: 'app-infrastructure-form',
  templateUrl: './infrastructure-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class InfrastructureFormComponent implements OnInit {
  @Input() infrastructure: any;
  @Input() beganDate: any = {};

  infrastructureForm: FormGroup;
  submitted = false;
  organizationMembers: OrganizationMembers[];
  organizationInfrastructures: Infrastructure[] = [];
  responsible: any;
  parent: number;

  constructor(
    public matDialogRef: MatDialogRef<InfrastructureFormComponent>,
    private _formBuilder: FormBuilder,
    private _infrastructureService: InfrastructureService,
    private _memberService: MemberService,
    private _toastrService: ToastrService,
  ) {}
  get validationControls() {
    return this.infrastructureForm.controls;
  }

  async ngOnInit() {
    this.infrastructureForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      key: ['', [Validators.required]],
      responsible: ['', [Validators.required]],
      parent: [],
      description: [''],
    });
    await this.getMembers();
    await this.getOrgInfrastructures();
    this.parent = Number(localStorage.getItem(constants.CURRENT_INFRASTRUCTURE_ID));
  }
  async onSubmit() {
    this.submitted = true;
    if (!this.infrastructureForm.valid) {
      return;
    }
    const infrastructure = this.getInfrastructureFromFormBuilder();
    try {
      await this._infrastructureService.createInfrastructure(infrastructure);
      this._toastrService.showSuccess(constants.CREATE_INFRASTRUCTURE_COMPLETED);
      this.matDialogRef.close();
    } catch (res) {
      this._toastrService.showError(res.error.error);
    }
  }

  private async getOrgInfrastructures() {
    this.organizationInfrastructures = await lastValueFrom(this._infrastructureService.getOrgInfrastructures().pipe(map((r) => r.body.data)));
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private getMembers() {
    const idOrg = this.getOrganizationIdFromLocalStorage();
    return this._memberService
      .getMembersByOrgId(idOrg)
      .then((resolve) => (this.organizationMembers = resolve))
      .catch(() => {
        this._toastrService.showInfo('GET_MEMBERS_LOAD_FAILED');
      });
  }
  private getInfrastructureFromFormBuilder(): Infrastructure {
    return new Infrastructure({
      ...this.infrastructureForm.value,
      organization: this.getOrganizationIdFromLocalStorage(),
      parent: this.parent,
    });
  }
  private getOrganizationIdFromLocalStorage(): number {
    return Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
  }
}
