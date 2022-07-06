import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Option } from '../reusable-components/list/list-component.component';
import { OrganizationGroupService } from './organization-groups.service';

@Component({
  selector: 'organization-groups',
  templateUrl: './organization-groups.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationGroupsComponent implements OnInit {
  groups: any[] = [];
  options: Option = { columns: [] };
  constructor(private _groupsService: OrganizationGroupService) {}
  ngOnInit(): void {
    this.options = {
      columns: [
        {
          name: {
            name: 'name',
          },
        },
        {
          status: {
            name: 'Status',
          },
        },
        {
          members: {
            name: 'Members',
          },
        },
        {
          date: {
            name: 'date',
          },
        },
      ],
    };
    this.groups = this._groupsService.getAllGroupsForOrganization();
  }

  createGroup() {}
}
