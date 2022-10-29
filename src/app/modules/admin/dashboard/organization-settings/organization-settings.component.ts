import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { lastValueFrom, map, Subject } from 'rxjs';

import { AdminOrganizationsService } from '../../resolvers/admin-organization/admin-organization.service';
import { MatDrawer } from '@angular/material/sidenav';
import { constants } from 'app/shared/constants';
import { ActivatedRoute } from '@angular/router';
import { values } from 'lodash';

@Component({
  selector: 'organization-settings',
  templateUrl: 'organization-settings.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationSettingsComponent implements OnInit {
  @Input() id: number;
  @ViewChild('drawer') drawer: MatDrawer;
  selectedPanel: string = 'general';
  title = 'Organization settings';
  panels: any[];
  organization: any;
  settings: any;

  constructor(private _organizationService: AdminOrganizationsService, private route: ActivatedRoute, private _cdf: ChangeDetectorRef) {}
  async ngOnInit(): Promise<void> {
    this.id = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    await lastValueFrom(this._organizationService.getOrgOrganizationById(this.id)).then(({ body }) => {
      this.organization = body.data[0];
    });
    await lastValueFrom(this._organizationService.getOrganizationSettingsById(this.id)).then(({ body }) => {
      this.settings = body.data;
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
    this._cdf.markForCheck();
  }

  changeSelectedPanel(selectedPanel: string) {
    this.selectedPanel = selectedPanel;
  }
}
