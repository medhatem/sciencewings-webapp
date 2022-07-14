import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { AdminOrganizationsService } from '../../resolvers/admin-organization/admin-organization.service';

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
  settings = null;
  currentOrganizations = null;
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
  ngOnInit(): void {
    // Setup available panels
    this.panels = [
      {
        id: 'general',
        icon: 'heroicons_outline:clipboard-check',
        title: 'General',
        description: 'Manage your public profile and private information',
      },
      {
        id: 'members',
        icon: 'heroicons_outline:cube',
        title: 'Members',
        description: 'Manage your password and 2-step verification preferences',
      },
      {
        id: 'location',
        icon: 'heroicons_outline:credit-card',
        title: 'Location',
        description: 'Manage your subscription plan, payment method and billing information',
      },
      {
        id: 'reservations',
        icon: 'heroicons_outline:bell',
        title: 'Reservations',
        description: 'Manage when you\'ll be notified on which channels',
      },
      {
        id: 'invocie',
        icon: 'heroicons_outline:user-group',
        title: 'Invocies',
        description: 'Manage your existing team and change roles/permissions',
      },
      {
        id: 'access',
        icon: 'heroicons_outline:eye',
        title: 'Access',
        description: 'Manage your existing team and change roles/permissions',
      },
      {
        id: 'subscription',
        icon: 'heroicons_outline:eye',
        title: 'Subscription',
        description: 'Manage your existing team and change roles/permissions',
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

    this._organizationService.getOrganizationSettingsById(1).subscribe(({ body }) => {
      if (body.statusCode === 500) {
        this._toastrService.showError('Something went wrong!');
        return;
      }
      const organization = body.data.organization;
      organization.phone = organization.phones[0];
      this.currentOrganizations = organization;

      this.settings = body.data.settings;
    });
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
    this.currentOrganizations = {
      ...this.currentOrganizations,
      ...payload,
    };
  }
}
