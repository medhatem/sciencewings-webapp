import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { lastValueFrom, map, Subject, takeUntil } from 'rxjs';

import { AdminOrganizationsService } from '../../resolvers/admin-organization/admin-organization.service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { MatDrawer } from '@angular/material/sidenav';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { GetOrganization } from 'app/models/organizations/organization';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'organization-settings',
  templateUrl: 'organization-settings.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationSettingsComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  selectedPanel: string = 'general';
  title = 'Organization settings';
  panels: any[];
  id: number;
  organization: any;
  settings: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _organizationService: AdminOrganizationsService, private route: ActivatedRoute, private _cdf: ChangeDetectorRef) {}
  async ngOnInit(): Promise<void> {
    const orgId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    await lastValueFrom(this._organizationService.getOrgOrganizationById(orgId)).then(({ body }) => {
      this.settings = body;
      this._cdf.markForCheck();
    });
    this.panels = [
      {
        id: 'general',
        icon: 'heroicons_outline:clipboard-check',
        title: 'ORGANIZATION.SETTINGS.GENERAL.TITLE',
        description: 'ORGANIZATION.SETTINGS.GENERAL.MESSAGE',
      },
      {
        id: 'members',
        icon: 'heroicons_outline:users',
        title: 'ORGANIZATION.SETTINGS.MEMBERS.TITLE',
        description: 'ORGANIZATION.SETTINGS.MEMBERS.MESSAGE',
      },
      {
        id: 'location',
        icon: 'heroicons_outline:eye',
        title: 'ORGANIZATION.SETTINGS.LOCATION.TITLE',
        description: 'ORGANIZATION.SETTINGS.LOCATION.MESSAGE',
      },
      {
        id: 'reservations',
        icon: 'heroicons_outline:bell',
        title: 'ORGANIZATION.SETTINGS.RESERVATIONS.TITLE',
        description: 'ORGANIZATION.SETTINGS.RESERVATIONS.MESSAGE',
      },
      {
        id: 'access',
        icon: 'heroicons_outline:eye',
        title: 'ORGANIZATION.SETTINGS.ACCESS.TITLE',
        description: 'ORGANIZATION.SETTINGS.ACCESS.MESSAGE',
      },
      {
        id: 'subscription',
        icon: 'heroicons_outline:credit-card',
        title: 'ORGANIZATION.SETTINGS.SUBSCRIPTION.TITLE',
        description: 'ORGANIZATION.SETTINGS.SUBSCRIPTION.MESSAGE',
      },
    ];
  }

  changeSelectedPanel(selectedPanel: string) {
    this.selectedPanel = selectedPanel;
  }
}
