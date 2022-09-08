import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'app/models/Member';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { MemberContractsFormComponent } from '../member-contracts-form/member-contracts-form.component';
import { ContractService } from 'app/modules/admin/resolvers/contract/contract.service';

@Component({
  selector: 'app-member-contracts',
  templateUrl: './member-contracts.component.html',
  styleUrls: ['./member-contracts.component.scss'],
})
export class MemberContractsComponent implements OnInit {
  @Input() userId: number;
  profile: any = {};
  openedDialogRef: any;
  constructor(
    private _route: ActivatedRoute,
    private _contractService: ContractService,
    private _toastrService: ToastrService,
    private _cdr: ChangeDetectorRef,
    private _matDialog: MatDialog,
  ) {}

  ngOnInit(): void {}
  openInviteProjectDialog(): void {
    const orgID = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    const userId = this.userId;
    if (!orgID) {
      this._toastrService.showError('Something went wrong!');
    }
    this.openedDialogRef = this._matDialog.open(MemberContractsFormComponent, {
      data: { orgID, userId },
    });
    this.openedDialogRef.afterClosed().subscribe((result) => {
      lastValueFrom(this._contractService.getMemberContracts());
    });
  }
}
