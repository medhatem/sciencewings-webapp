import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ContractRo } from 'app/models/contract/contract';
import { contractType, jobLevel } from 'app/models/contract/contract.constants';
import { ContractService } from 'app/modules/admin/resolvers/contract/contract.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { OrganizationMembers } from 'app/models/members/member';
import moment from 'moment';

@Component({
  selector: 'app-member-contracts-form',
  templateUrl: './member-contracts-form.component.html',
  styleUrls: ['./member-contracts-form.component.scss'],
})
export class MemberContractsFormComponent implements OnInit {
  contractTypes = contractType;
  jobLevels = jobLevel;
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
      this.matDialogRef.close();
    } catch (error) {
      this._toastrService.showError('create contract failed');
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

  private getContractFromFormBuilder(): ContractRo {
    const contract = new ContractRo({
      name: String(this.contractForm.value?.name) || null,
      contractType: String(this.contractForm.value?.contractType) || null,
      organization: this.data.orgID,
      user: this.data.userId,
      dateStart: moment(this.contractForm.value?.dateStart).format('YYYY-MM-DD').toString(),
      dateEnd: moment(this.contractForm.value?.dateEnd).format('YYYY-MM-DD').toString(),
      supervisor: this.contractForm.value?.supervisor || null,
      jobLevel: String(this.contractForm.value?.jobLevel) || null,
      wage: Number(this.contractForm.value?.wage) || null,
    });
    if (contract.contractType === 'Permanant') {
      delete contract.dateEnd;
    }
    return contract;
  }
}
