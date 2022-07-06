import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Option } from '../reusable-components/list/list-component.component';
import { OrganizationMemberService } from './organization-members.service';

@Component({
  selector: 'organizationmembers',
  templateUrl: './organization-members.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationMemebrsComponent implements OnInit {
  members: any[] = [];
  options: Option = { columns: [] };
  constructor(private _groupsService: OrganizationMemberService) {}

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

  inviteMember() {}
}
