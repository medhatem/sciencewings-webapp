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
export class ProjectSettingsComponent implements OnInit {
  selectedPanel: string = 'project-general';
  settings = null;
  currentProjects = null;
  panels: any[];
  /**
   * Constructor
   */
  constructor(private _changeDetectorRef: ChangeDetectorRef, private _fuseMediaWatcherService: FuseMediaWatcherService) {}

  /**
   * On init
   */
  ngOnInit(): void {
    // Setup available panels
    this.panels = [
      {
        id: 'project-general',
        icon: 'heroicons_outline:clipboard-check',
        title: 'ORGANIZATION.PROJECTS.SETTINGS.GENERAL_PANEL',
        description: 'ORGANIZATION.PROJECTS.SETTINGS.GENERAL_DESC',
      },
      {
        id: 'membership-settings',
        icon: 'heroicons_outline:user-group',
        title: 'ORGANIZATION.PROJECTS.SETTINGS.Membership_PANEL',
        description: 'ORGANIZATION.PROJECTS.SETTINGS.Membership_DESC',
      },
      {
        id: 'groups-settings',
        icon: 'heroicons_outline:user-group',
        title: 'ORGANIZATION.PROJECTS.SETTINGS.GROUPS_PANEL',
        description: 'ORGANIZATION.PROJECTS.SETTINGS.GROUPS_DESC',
      },
    ];
  }

  changeSelectedPanel(selectedPanel) {
    this.selectedPanel = selectedPanel;
  }
}
