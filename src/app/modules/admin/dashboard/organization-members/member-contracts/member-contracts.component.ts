import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { MemberContractsFormComponent } from '../member-contracts-form/member-contracts-form.component';
import { ContractService } from 'app/modules/admin/resolvers/contract/contract.service';
import { ListOption } from '../../reusable-components/list/list-component.component';
import { GetContract } from 'app/models/contract/contract';

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
    this._contractService.getAndParseMemberContracts(this.userId, this.orgId).subscribe((contracts: GetContract[]) => {
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
        this._contractService.getAndParseMemberContracts(this.userId, this.userId).subscribe((contracts: GetContract[]) => {
          this.contracts = contracts;
          this._cdr.markForCheck();
        });
      });
  }

  async onElementSelected(item: any) {
    this._router.navigate(['/admin/project/organization-members']);
  }
}
