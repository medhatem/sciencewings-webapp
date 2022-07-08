import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'app/models/Member';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberService } from '../../resolvers/members/member.service';
import { Option } from '../reusable-components/list/list-component.component';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'organizationmembers',
  templateUrl: './organization-members.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationMemebrsComponent implements OnInit {
  members: any[] = [];
  options: Option = { columns: [] };
  openedDialogRef: any;
  constructor(
    private _memberService: MemberService,
    private _matDialog: MatDialog,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.options = {
      columns: [
        { columnName: 'Profile', columnPropertyToUse: 'profile' },
        { columnName: 'Role', columnPropertyToUse: 'role' },
        { columnName: 'Status', columnPropertyToUse: 'status' },
        { columnName: 'Joined', columnPropertyToUse: 'date' },
      ],
      numnberOfColumns: 4,
    };

    this._memberService.members$.subscribe((members: Member[]) => {
      this.members = members;
      this._changeDetectorRef.markForCheck();
    });
  }

  openInviteMemberDialog(): void {
    const orgID = localStorage.getItem(constants.USER_ORGANIZATION_ID);
    if (!orgID) {
      this._toastrService.showError('Something went wrong!');
    }
    this.openedDialogRef = this._matDialog.open(MemberFormComponent, {
      data: { orgID },
    });
    this.openedDialogRef.afterClosed().subscribe((result) => {
      lastValueFrom(this._memberService.getAndParseOrganizationMember());
    });
  }
}
