import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reusable-settings',
  templateUrl: './reusable-settings.component.html',
  styleUrls: ['./reusable-settings.component.scss'],
})
export class ReusableSettingsComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  // @ViewChild('showComponent') showComponent: HTMLElement;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  @Input() selectedPanel: string;
  @Output() OnSelectedPanelChange = new EventEmitter<string>();
  @Input() panels: any[] = [];
  @Input() title: string;

  settings = null;
  currentProjects = null;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _fuseMediaWatcherService: FuseMediaWatcherService) {}

  ngOnInit(): void {
    // this.showComponent.appendChild()
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
    this.OnSelectedPanelChange.emit(this.selectedPanel);
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
}
