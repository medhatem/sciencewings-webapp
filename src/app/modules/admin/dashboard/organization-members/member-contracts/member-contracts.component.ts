import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { MemberContractsFormComponent } from '../member-contracts-form/member-contracts-form.component';
import { ContractService } from 'app/modules/admin/resolvers/contract/contract.service';
import { ListOption } from '../../reusable-components/list/list-component.component';
import { ContractRo, GetContract } from 'app/models/contract/contract';
import { MemberUpdateContractComponent } from '../member-update-contract/member-update-contract.component';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'app-member-contracts',
  templateUrl: './member-contracts.component.html',
  styleUrls: ['./member-contracts.component.scss'],
})
export class MemberContractsComponent implements OnInit {
  @Input() userId: number;
  @Input() orgId: number;
  options: ListOption = { columns: [], numnberOfColumns: 4 };
  contracts: any[] = [];
  conDto: any;
  openedDialogRef: any;
  constructor(
    private _route: ActivatedRoute,
    private _contractService: ContractService,
    private _toastrService: ToastrService,
    private _cdr: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._contractService.getAndParseMemberContracts(this.orgId, this.userId).subscribe((contracts: GetContract[]) => {
      this.contracts = contracts;
      this._cdr.markForCheck();
    });

    this.options = {
      columns: [
        { columnName: 'ORGANIZATION.CONTRACTS.FORM.JOB_NAME', columnPropertyToUse: 'name', customClass: 'hidden' },
        { columnName: 'ORGANIZATION.CONTRACTS.FORM.SUPERVISOR', columnPropertyToUse: 'supervisor', customClass: 'hidden' },
        { columnName: 'ORGANIZATION.CONTRACTS.FORM.JOB_LEVEL', columnPropertyToUse: 'jobLevel', customClass: 'hidden' },
        { columnName: 'ORGANIZATION.CONTRACTS.FORM.STARTDATE', columnPropertyToUse: 'dateStart', customClass: 'hidden' },
      ],
      numnberOfColumns: 4,
      onElementClick: this.onElementSelected.bind(this),
    };
  }

  openInviteContractDialog(): void {
    const orgID = this.orgId;
    const userId = this.userId;
    if (!orgID) {
      this._toastrService.showError('Something went wrong!');
    }
    this.openedDialogRef = this._matDialog
      .open(MemberContractsFormComponent, {
        data: { orgID, userId },
      })
      .afterClosed()
      .subscribe(() => {
        this._contractService.getAndParseMemberContracts(this.orgId, this.userId).subscribe((contracts: GetContract[]) => {
          this.contracts = contracts;
          this._cdr.markForCheck();
        });
      });
  }

  async onElementSelected(item: any) {
    const orgID = this.getOrganizationIdFromLocalStorage();
    const userId = this.userId;
    const contractDto = item.contractDto;
    this.openedDialogRef = this._matDialog
      .open(MemberUpdateContractComponent, {
        data: { orgID, userId, contractDto },
      })
      .afterClosed()
      .subscribe(() => {
        this._contractService.getAndParseMemberContracts(orgID, this.userId).subscribe((contracts: GetContract[]) => {
          this.contracts = contracts;
          this._cdr.markForCheck();
        });
      });
  }

  private getOrganizationIdFromLocalStorage(): number {
    return Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
  }
}
