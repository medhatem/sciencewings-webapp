import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MemberFormComponent } from './member-form/member-form.component';
import { Option } from '../reusable-components/list/list-component.component';
import { OrganizationMemberService } from './organization-members.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';

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
  constructor(private _groupsService: OrganizationMemberService, private _matDialog: MatDialog, private _toastrService: ToastrService) {}

  ngOnInit(): void {
    this.options = {
      columns: [
        {
          name: {
            name: 'Profile',
          },
        },
        {
          status: {
            name: 'Role',
          },
        },
        {
          members: {
            name: 'Status',
          },
        },
        {
          date: {
            name: 'Joined',
          },
        },
      ],
    };
    this.members = this._groupsService.getAllMembersForOrganization();
  }

  openInviteMemberDialog(): void {
    const orgID = localStorage.getItem(constants.USER_ORGANIZATION_ID);
    if (!orgID) {
      this._toastrService.showError('Something went wrong!');
    }
    this.openedDialogRef = this._matDialog.open(MemberFormComponent, {
      data: { orgID },
    });
    this.openedDialogRef.afterClosed().subscribe((result) => {});
  }
}
