import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ContractRo, ContractType, GetContract, JobLevel } from 'app/models/contract/contract';
import { ContractService } from 'app/modules/admin/resolvers/contract/contract.service';
import { constants } from 'app/shared/constants';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orgId: number; userId: number; contractDto: any },
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _contractService: ContractService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log('old contract ================= ', this.data.contractDto);
    const contractFormObj = {
      jobName: [this.data?.contractDto?.job?.name || '', [Validators.required]],
      jobLevel: [this.data?.contractDto?.jobLevel || '', [Validators.required]],
      contractType: [this.data?.contractDto?.contractType || '', [Validators.required]],
      dateStart: [this.data?.contractDto?.dateStart || '', [Validators.required]],
      dateEnd: [this.data?.contractDto?.endDate || ''],
      description: [this.data?.contractDto?.description || '', [Validators.required]],
    };
    this.contractForm = this._formBuilder.group(contractFormObj);
  }
  async onSubmit() {
    if (!this.contractForm.valid) {
      this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
      return;
    }

    const contract = this.getUpdatedContractFromFormBuilder();
    try {
      console.log('contractId============ ', this.data.contractDto.id);
      await this._contractService.updateContract(this.data.contractDto.id, contract);
      this._toastrService.showSuccess('update contract succeeded');
      this._router.navigate(['/', constants.MODULES_ROUTINGS_URLS.ADMIN, constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.ORGANIZATION_MEMBERS]);
    } catch (error) {
      this._router.navigate(['/', constants.MODULES_ROUTINGS_URLS.ADMIN, constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.ORGANIZATION_MEMBERS]);
      this._toastrService.showError('update contract failed');
    }
  }
  private getUpdatedContractFromFormBuilder(): ContractRo {
    return new ContractRo({
      ...this.data.contractDto,
      ...this.contractForm.value,
      organization: this.getOrganizationIdFromLocalStorage(),
      user: Number(this.data.userId),
      dateStart: String(this.contractForm.value.dateStart),
    });
  }
  private getOrganizationIdFromLocalStorage(): number {
    return Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
  }
}
