import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ContractRo } from 'app/models/contract/contract';
import { ContractService } from 'app/modules/admin/resolvers/contract/contract.service';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'app-member-contracts-form',
  templateUrl: './member-contracts-form.component.html',
  styleUrls: ['./member-contracts-form.component.scss'],
})
export class MemberContractsFormComponent implements OnInit {
  contractForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _contractService: ContractService,
    private _toastrService: ToastrService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    const contractFormObj = {
      name: ['', [Validators.required]],
      jobLevel: ['', [Validators.required]],
      wage: ['', [Validators.required]],
      contractType: ['', [Validators.required]],
      dateStart: ['', [Validators.required]],
    };

    this.contractForm = this._formBuilder.group(contractFormObj);
  }
  async onSubmit() {
    if (!this.contractForm.valid) {
      this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
      return;
    }

    const contract = this.getContractFromFormBuilder();
    try {
      await this._contractService.createContract(contract);
      this._toastrService.showSuccess(constants.CREATE_PROJECT_COMPLETED);
      this._router.navigate(['/', constants.MODULES_ROUTINGS_URLS.PROJECT]);
    } catch (error) {
      this._router.navigate(['/', constants.MODULES_ROUTINGS_URLS.PROJECT]);
      this._toastrService.showError(constants.CREATE_PROJECT_FAILED);
    }
  }
  private getContractFromFormBuilder(): ContractRo {
    return new ContractRo({ ...this.contractForm.value, organization: this.getOrganizationIdFromLocalStorage() });
  }
  private getOrganizationIdFromLocalStorage(): number {
    return Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
  }
}
