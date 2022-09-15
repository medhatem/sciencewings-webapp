import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { UpdateContract } from 'app/models/contract/contract';
import { ContractService } from 'app/modules/admin/resolvers/contract/contract.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { OrganizationMembers } from 'app/models/members/member';
import { contractType, jobLevel } from 'app/models/contract/contract.constants';
import moment from 'moment';

@Component({
  selector: 'app-member-update-contract',
  templateUrl: './member-update-contract.component.html',
  styleUrls: ['./member-update-contract.component.scss'],
})
export class MemberUpdateContractComponent implements OnInit {
  contractTypes = contractType;
  jobLevels = jobLevel;
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
      jobName: [this.data?.contractDto?.job?.name || ''],
      jobLevel: [this.data?.contractDto?.jobLevel || ''],
      contractType: [this.data?.contractDto?.contractType || ''],
      dateStart: [this.data?.contractDto?.dateStart || ''],
      dateEnd: [this.data?.contractDto?.endDate || ''],
      description: [this.data?.contractDto?.description || ''],
      supervisor: [this.data?.contractDto?.supervisor?.name],
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

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private getUpdatedContractFromFormBuilder(): UpdateContract {
    const contractRo = new UpdateContract({
      organization: Number(this.data.orgId),
      user: Number(this.data.userId),
      dateStart: String(moment(this.contractForm.value?.dateStart).format('YYYY-MM-DD')),
      dateEnd: String(moment(this.contractForm.value?.dateEnd).format('YYYY-MM-DD')),
      jobName: this.contractForm.value?.jobName || this.data.contractDto.name,
      jobLevel: this.contractForm.value?.jobLevel || this.data.contractDto.jobLevel,
      contractType: this.contractForm.value?.contractType || this.data.contractDto.contractType,
      description: this.contractForm.value?.description || this.data.contractDto.description,
      supervisor: this.contractForm.value?.supervisor || this.data.contractDto.supervisor,
    });
    if (contractRo.contractType !== 'Contract base') {
      delete contractRo.dateEnd;
    }
    return contractRo;
  }
}
