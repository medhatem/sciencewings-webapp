import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { lastValueFrom, map, Subject, takeUntil } from 'rxjs';

import { AdminOrganizationsService } from '../../resolvers/admin-organization/admin-organization.service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { MatDrawer } from '@angular/material/sidenav';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { GetOrganization } from 'app/models/organizations/organization';

@Component({
  selector: 'organization-settings',
  templateUrl: 'organization-settings.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationSettingsComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: any[] = [];
  selectedPanel: string = 'account';
  settings: any;
  organization: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _organizationService: AdminOrganizationsService,
    private _toastrService: ToastrService,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  async ngOnInit(): Promise<void> {
    // Setup available panels
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

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
      // Set the drawerMode and drawerOpened
      if (matchingAliases.includes('lg')) {
        this.drawerMode = 'side';
        this.drawerOpened = true;
      } else {
        this.drawerMode = 'over';
        this.drawerOpened = false;
      }

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    const orgId = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    this.organization = await lastValueFrom(
      this._organizationService.getOrgOrganizationById(Number(orgId)).pipe(map(({ body }) => new GetOrganization(body))),
    );
    this.settings = this.organization.settings;
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Navigate to the panel
   *
   * @param panel
   */
  goToPanel(panel: string): void {
    this.selectedPanel = panel;

    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }

  /**
   * Get the details of the panel
   *
   * @param id
   */
  getPanelInfo(id: string): any {
    return this.panels.find((panel) => panel.id === id);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  updateLocalSettings(payload) {
    this.settings = {
      ...this.settings,
      ...payload,
    };
  }

  updateLocalOrganization(payload) {
    this.organization = {
      ...this.organization,
      ...payload,
    };
  }
}
