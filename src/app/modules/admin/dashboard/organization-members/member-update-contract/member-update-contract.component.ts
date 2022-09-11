import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ContractRo, ContractType, GetContract, JobLevel, UpdateContract } from 'app/models/contract/contract';
import { ContractService } from 'app/modules/admin/resolvers/contract/contract.service';
import { constants } from 'app/shared/constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { OrganizationMembers } from 'app/models/members/member';

@Component({
  selector: 'app-member-update-contract',
  templateUrl: './member-update-contract.component.html',
  styleUrls: ['./member-update-contract.component.scss'],
})
export class MemberUpdateContractComponent implements OnInit {
  contractTypes = ContractType;
  jobLevels = JobLevel;
  contractForm: FormGroup;
  contracts: any[] = [];
  supervisors: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orgId: number; userId: number; contractDto: any },
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _contractService: ContractService,
    private _memberService: MemberService,
    private _toastrService: ToastrService,
    public matDialogRef: MatDialogRef<MemberUpdateContractComponent>,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._memberService.getOrgMembers().subscribe(({ body }) => {
      this.supervisors = body.data.map((member) => new OrganizationMembers(member));
    });
    const contractFormObj = {
      jobName: [this.data?.contractDto?.job?.name || '', [Validators.required]],
      jobLevel: [this.data?.contractDto?.jobLevel || '', [Validators.required]],
      contractType: [this.data?.contractDto?.contractType || '', [Validators.required]],
      dateStart: [this.data?.contractDto?.dateStart || '', [Validators.required]],
      dateEnd: [this.data?.contractDto?.endDate || ''],
      description: [this.data?.contractDto?.description || '', [Validators.required]],
      supervisor: [this.data?.contractDto?.supervisor?.name, [Validators.required]],
    };
    this.contractForm = this._formBuilder.group(contractFormObj);
  }
  async onSubmit() {
    const contract = this.getUpdatedContractFromFormBuilder();
    try {
      await this._contractService.updateContract(this.data.contractDto.id, contract);
      this._toastrService.showSuccess('update contract succeeded');
      this.matDialogRef.close();
    } catch (error) {
      this._toastrService.showError('update contract failed');
    }
  }
  private getUpdatedContractFromFormBuilder(): UpdateContract {
    const contractRo = new UpdateContract({
      ...this.data.contractDto,
      ...this.contractForm.value,
      organization: this.getOrganizationIdFromLocalStorage(),
      user: Number(this.data.userId),
      dateStart: String(this.contractForm.value.dateStart),
      dateEnd: String(this.contractForm.value?.dateEnd || ''),
      jobName: this.contractForm.value?.jobName || this.data.contractDto.name,
    });
    if (contractRo.contractType === 'Permanant') {
      delete contractRo.dateEnd;
    }
    return contractRo;
  }
  private getOrganizationIdFromLocalStorage(): number {
    return Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
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
