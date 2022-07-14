import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { constants } from 'app/shared/constants';

@Component({
  selector: 'admin-organization',
  templateUrl: './admin-organization.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOrganizationComponent {
  readonly organizationProfilePath = `/${constants.MODULES_ROUTINGS_URLS.ADMIN}/${constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.ORGANIZATION_PROFILE}`;
}
