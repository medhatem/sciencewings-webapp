import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { OrganizationUsersService } from '../../resolvers/users/organization-users.service';

@Component({
  selector: 'organization-users',
  templateUrl: './organization-users.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationUsersComponent implements OnInit {
  teamMembers: any;
  selectedProject: string = 'ACME Corp. Backend App';
  constructor(private _organizationUsersService: OrganizationUsersService, private _toastrService: ToastrService) {}

  async ngOnInit() {
    try {
      this.teamMembers = await this._organizationUsersService.getData();
    } catch (error) {
      this._toastrService.showError(error);
    }
  }
}
