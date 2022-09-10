import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'app/models/Member';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { MemberContractsFormComponent } from '../member-contracts-form/member-contracts-form.component';
import { ContractService } from 'app/modules/admin/resolvers/contract/contract.service';
import { ListOption } from '../../reusable-components/list/list-component.component';
import { ContractRo, GetContract } from 'app/models/contract/contract';
import { MemberUpdateContractComponent } from '../member-update-contract/member-update-contract.component';

@Component({
  selector: 'app-member-contracts',
  templateUrl: './member-contracts.component.html',
  styleUrls: ['./member-contracts.component.scss'],
})
export class MemberContractsComponent implements OnInit {
  @Input() userId: number;
  orgID: number;
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
    this.orgID = this.getOrganizationIdFromLocalStorage();
    this._contractService.getAndParseMemberContracts(this.userId, this.userId).subscribe((contracts: GetContract[]) => {
      this.contracts = contracts;
      this._cdr.markForCheck();
    });

    this.options = {
      columns: [
        { columnName: 'Name', columnPropertyToUse: 'name', customClass: 'hidden' },
        { columnName: 'Supervisor', columnPropertyToUse: 'supervisor', customClass: 'hidden' },
        { columnName: 'Job Level', columnPropertyToUse: 'jobLevel', customClass: 'hidden' },
        { columnName: 'Date start', columnPropertyToUse: 'dateStart', customClass: 'hidden' },
      ],
      numnberOfColumns: 4,
      onElementClick: this.onElementSelected.bind(this),
    };
    this.conDto = this._contractService.getAndParseMemberContracts(this.userId, this.userId);
    console.log('contdtoooooooooooooooo= ', this.conDto.supervisor);
  }
  openInviteProjectDialog(): void {
    const orgID = this.getOrganizationIdFromLocalStorage();
    const userId = this.userId;

    if (!orgID) {
      this._toastrService.showError('Something went wrong!');
    }
    this.openedDialogRef = this._matDialog.open(MemberContractsFormComponent, {
      data: { orgID, userId },
    });
    this.openedDialogRef.afterClosed().subscribe((result) => {
      lastValueFrom(this._contractService.getAndParseMemberContracts(this.userId, this.userId));
    });
  }
  private getOrganizationIdFromLocalStorage(): number {
    return Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
  }
  async onElementSelected(item: any) {
    console.log('old item ========= indide cimpon', item.contractDto);
    const orgID = this.getOrganizationIdFromLocalStorage();
    const userId = this.userId;
    const contractDto = item.contractDto;
    this.openedDialogRef = this._matDialog.open(MemberUpdateContractComponent, {
      data: { orgID, userId, contractDto },
    });
    this.openedDialogRef.afterClosed().subscribe((result) => {
      lastValueFrom(this._contractService.getAndParseMemberContracts(this.userId, this.userId));
    });
  }
}
