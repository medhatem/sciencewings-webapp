import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { OrganizationMembers } from 'app/models/members/member';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { constants } from 'app/shared/constants';
import { InfrastructureService } from 'app/modules/admin/resolvers/infrastructure/infrastructure.service';
import { Infrastructure } from 'app/models/infrastructures/infrastructure';
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
  // responsibles: [] = [];

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

  ngOnInit() {
    this.getMembers();
    this.infrastructureForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      key: ['', [Validators.required]],
      // responsibles: [],
      description: [''],
    });
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
    return new Infrastructure({ ...this.infrastructureForm.value, organization: this.getOrganizationIdFromLocalStorage() });
  }
  private getOrganizationIdFromLocalStorage(): number {
    return Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
  }
}
