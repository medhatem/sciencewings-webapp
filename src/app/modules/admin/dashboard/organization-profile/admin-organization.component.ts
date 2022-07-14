import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'admin-organization',
  templateUrl: './admin-organization.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOrganizationComponent implements OnInit {
  readonly organizationProfilePath = `/${constants.MODULES_ROUTINGS_URLS.ADMIN}/${constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.ORGANIZATION_PROFILE}`;

  constructor(private _router: Router) {}

  ngOnInit() {
    const currentOrgId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID)) || '';
    this._router.navigate([this.organizationProfilePath, currentOrgId]);
  }
}
