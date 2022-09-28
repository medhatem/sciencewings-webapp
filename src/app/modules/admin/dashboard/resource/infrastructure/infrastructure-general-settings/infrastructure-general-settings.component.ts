import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InfrastructureService } from 'app/modules/admin/resolvers/infrastructure/infrastructure.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { map } from 'rxjs';
import { UpdateInfrastructure } from 'app/models/infrastructures/infrastructure';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { UserOrganizations } from 'app/models/organizations/user-organizations';
import { OrganizationMembers } from 'app/models/members/member';

@Component({
  selector: 'app-infrastructure-general-settings',
  templateUrl: './infrastructure-general-settings.component.html',
})
export class InfrastructureGeneralSettingsComponent implements OnInit {
  @Input() id: any;
  form: FormGroup;
  infrastructure: any;
  userOrganizations: UserOrganizations[] = [];
  organizationMembers: OrganizationMembers[];

  constructor(
    private _infarstructureService: InfrastructureService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _router: Router,
    private route: ActivatedRoute,
    private _memberService: MemberService,
  ) {}

  ngOnInit(): void {
    this.getMembers();
    this.id = this.route.snapshot.paramMap.get('id');
    this.form = this._formBuilder.group({
      name: [''],
      key: [''],
      responsable: [''],
      contact: [''],
      parent: [''],
      description: [''],
    });
  }

  async ngAfterViewInit(): Promise<void> {
    this.infrastructure = await lastValueFrom(this._infarstructureService.getOrgInfrastructures().pipe(map((r) => r.body)));
    this.form.setValue({
      name: this?.infrastructure?.name || '',
      key: this?.infrastructure?.key || '',
      responsible: this?.infrastructure?.responsible || '',
      contact: this?.infrastructure?.contact || '',
      parent: this?.infrastructure?.parent,
      description: this?.infrastructure?.description || '',
    });
  }

  async onSubmit() {
    if (!this.form.valid) {
      this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
      return;
    }
    const infrastructure = this.getInfrastructureFromFormBuilder();
    try {
      await this._infarstructureService.updateInfrastructure(this.id, infrastructure);
      await lastValueFrom(this._infarstructureService.getAndParseOrganizationInfrastructures());
      this._toastrService.showSuccess(constants.UPDATE_INFRASTRUCTURE_COMPLETED);
      this._router.navigate(['/', constants.MODULES_ROUTINGS_URLS.INFRASTRUCTURE]);
    } catch (error) {
      this._toastrService.showError(constants.UPDATE_INFRASTRUCTURE_FAILED);
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

  private getOrganizationIdFromLocalStorage(): number {
    return Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
  }

  private getInfrastructureFromFormBuilder(): UpdateInfrastructure {
    return new UpdateInfrastructure({
      name: this.form.value?.name || this.infrastructure.name,
      key: this.form.value?.key || this.infrastructure.key,
      responsible: this.form.value?.responsible || this.infrastructure.responsible,
      contact: this.form.value?.contact || this.infrastructure?.contact,
      parent: this.form.value?.parent || this.infrastructure.parent,
      description: this.form.value?.description || this.infrastructure.description,
    });
  }
}
