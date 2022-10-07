import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InfrastructureService } from 'app/modules/admin/resolvers/infrastructure/infrastructure.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { UpdateInfrastructure } from 'app/models/infrastructures/infrastructure';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { UserOrganizations } from 'app/models/organizations/user-organizations';
import { OrganizationMembers } from 'app/models/members/member';

@Component({
  selector: 'app-infrastructure-general-settings',
  templateUrl: './infrastructure-general-settings.component.html',
})
export class InfrastructureGeneralSettingsComponent implements OnInit {
  @Input() infrastructure: any;
  @Input() id: any;

  form: FormGroup;
  userOrganizations: UserOrganizations[] = [];
  organizationMembers: OrganizationMembers[];
  infraId: number;

  constructor(
    private _infarstructureService: InfrastructureService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _router: Router,
    private _memberService: MemberService,
  ) {}

  async ngOnInit() {
    this.infraId = Number(localStorage.getItem(constants.CURRENT_INFRASTRUCTURE_ID));
    this.form = this._formBuilder.group({
      name: this?.infrastructure?.name || '',
      key: this?.infrastructure?.key || '',
      responsible: this?.infrastructure?.responsible,
      description: this?.infrastructure?.description || '',
    });
    await this.getMembers();
  }

  async onSubmit() {
    if (!this.form.valid) {
      this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
      return;
    }
    const infraId = localStorage.getItem(constants.CURRENT_INFRASTRUCTURE_ID);
    const infrastructure = this.getInfrastructureFromFormBuilder();
    try {
      await lastValueFrom(this._infarstructureService.updateInfrastructure(this.infraId, infrastructure as any));
      await lastValueFrom(this._infarstructureService.getAndParseOrganizationInfrastructures());
      this._toastrService.showSuccess(constants.UPDATE_INFRASTRUCTURE_COMPLETED);
      this._router.navigate([constants.MODULES_ROUTINGS_URLS.INFRASTRUCTURE]);
    } catch (error) {
      this._toastrService.showError(constants.UPDATE_INFRASTRUCTURE_FAILED);
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private async getMembers() {
    const idOrg = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    return this._memberService
      .getMembersByOrgId(idOrg)
      .then((organizationMembers) => (this.organizationMembers = organizationMembers))
      .catch((err) => {
        this._toastrService.showInfo('GET_MEMBERS_LOAD_FAILED');
      });
  }

  private getInfrastructureFromFormBuilder(): UpdateInfrastructure {
    return new UpdateInfrastructure({
      ...this.form.value,
    });
  }
}
