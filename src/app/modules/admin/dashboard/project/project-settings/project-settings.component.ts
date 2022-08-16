import { Component, OnInit, Output } from '@angular/core';
import { ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss'],
})
export class ProjectSettingsComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  selectedPanel: string = 'project-general';
  settings = null;
  currentProjects = null;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  panels: any[];
  /**
   * Constructor
   */
  constructor(private _changeDetectorRef: ChangeDetectorRef, private _fuseMediaWatcherService: FuseMediaWatcherService) {}

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
        id: 'project-general',
        icon: 'heroicons_outline:clipboard-check',
        title: 'General',
        description: 'Manage your public project and private information',
      },
      {
        id: 'membership-settings',
        icon: 'heroicons_outline:user-group',
        title: 'Membership',
        description: 'Manage the memberships',
      },
      {
        id: 'groups-settings',
        icon: 'heroicons_outline:user-group',
        title: 'Groups',
        description: 'Manage your groups',
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

  updateLocalProject(payload) {
    this.currentProjects = {
      ...this.currentProjects,
      ...payload,
    };
  }
  logging() {
    console.log('selectedPanel= ', this.selectedPanel);
  }
  changeSelectedPanel(selectedPanel) {
    this.selectedPanel = selectedPanel;
  }
}
