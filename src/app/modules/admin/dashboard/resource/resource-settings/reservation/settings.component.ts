import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { CookieService } from 'ngx-cookie-service';
import { constants } from 'app/shared/constants';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'settings',
  templateUrl: 'settings.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: any[] = [];
  selectedPanel: string = 'account';
  settings = null;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _resourceService: ResourceService,
    private _toastrService: ToastrService,
    private _coookies: CookieService,
    private _translocoService: TranslocoService,
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
        title: 'ORGANIZATION.SETTINGS.RESOUCES.RESERVATION.RESERVATION_TITLE',
        description: 'ORGANIZATION.SETTINGS.RESOUCES.RESERVATION.GENERAL_MESSAGE',
      },
      {
        id: 'units',
        icon: 'heroicons_outline:cube',
        title: 'ORGANIZATION.SETTINGS.RESOUCES.RESERVATION.UNIT_TITLE',
        description: 'ORGANIZATION.SETTINGS.RESOUCES.RESERVATION.UNIT_MESSAGE',
      },
      {
        id: 'rates',
        icon: 'heroicons_outline:credit-card',
        title: 'ORGANIZATION.SETTINGS.RESOUCES.RESERVATION.RATE_TITILE',
        description: 'ORGANIZATION.SETTINGS.RESOUCES.RESERVATION.RATE_MESSAGE',
      },
      {
        id: 'time_restriction',
        icon: 'heroicons_outline:bell',
        title: 'ORGANIZATION.SETTINGS.RESOUCES.RESERVATION.TIME_RESTRICTION_TITLE',
        description: 'ORGANIZATION.SETTINGS.RESOUCES.RESERVATION.TIME_RESTRICTION_MESSAGE',
      },
      {
        id: 'visibility',
        icon: 'heroicons_outline:eye',
        title: 'ORGANIZATION.SETTINGS.RESOUCES.RESERVATION.VISIBILITY_TITLE',
        description: 'ORGANIZATION.SETTINGS.RESOUCES.RESERVATION.VISIBILITY_MESSAGE',
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

    const selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
    this._resourceService.getResourceSettings(selectedResourceId).subscribe(({ body }) => {
      if (body.statusCode === 500) {
        this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
        return;
      }
      this.settings = body;
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
}
