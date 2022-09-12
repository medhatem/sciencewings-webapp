import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ContractRo, ContractType, JobLevel } from 'app/models/contract/contract';
import { ContractService } from 'app/modules/admin/resolvers/contract/contract.service';
import { constants } from 'app/shared/constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { OrganizationMembers } from 'app/models/members/member';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  selector: 'app-member-contracts-form',
  templateUrl: './member-contracts-form.component.html',
  styleUrls: ['./member-contracts-form.component.scss'],
})
export class MemberContractsFormComponent implements OnInit {
  contractTypes = ContractType;
  jobLevels = JobLevel;
  contractForm: FormGroup;
  supervisors: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orgID: number; userId: number },
    private _route: ActivatedRoute,
    public matDialogRef: MatDialogRef<MemberContractsFormComponent>,
    private _formBuilder: FormBuilder,
    private _contractService: ContractService,
    private _memberService: MemberService,
    private _toastrService: ToastrService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._memberService.getOrgMembers().subscribe(({ body }) => {
      this.supervisors = body.data.map((member) => new OrganizationMembers(member));
    });
    const contractFormObj = {
      name: ['', [Validators.required]],
      jobLevel: [''],
      wage: [''],
      contractType: [''],
      dateStart: ['', [Validators.required]],
      supervisor: [''],
      dateEnd: [''],
    };

    this.contractForm = this._formBuilder.group(contractFormObj);
  }
  async onSubmit() {
    const contract = this.getContractFromFormBuilder();
    try {
      await this._contractService.createContract(contract);
      this._toastrService.showSuccess('create contract succeeded');
      this._router.navigate([
        '/',
        constants.MODULES_ROUTINGS_URLS.ADMIN,
        constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.ORGANIZATION_MEMBERS,
        constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.MEMBER_PROFILE,
        this.data.orgID,
        this.data.userId,
      ]);
    } catch (error) {
      this._toastrService.showError('create contract failed');
    }
  }
  private getContractFromFormBuilder(): ContractRo {
    const contract = new ContractRo({
      name: String(this.contractForm.value?.name) || null,
      contractType: String(this.contractForm.value?.contractType) || null,
      organization: this.data.orgID,
      user: this.data.userId,
      dateStart: String(this.contractForm.value.dateStart),
      dateEnd: String(this.contractForm.value?.dateEnd) || null,
      supervisor: this.contractForm.value?.supervisor || null,
      jobLevel: String(this.contractForm.value?.jobLevel) || null,
      wage: String(this.contractForm.value?.wage) || null,
    });
    if (contract.contractType === 'Permanant') {
      delete contract.dateEnd;
    }
    return contract;
  }
  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
