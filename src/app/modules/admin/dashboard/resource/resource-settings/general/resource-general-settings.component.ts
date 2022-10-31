import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'resource-general-settings',
  templateUrl: 'resource-general-settings.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceGeneralSettingsComponent implements OnInit {
  selectedPanel: string = 'general';
  title = 'APP.ROUTES.ADMIN.RESOURCE_SETTINGS.TITLE';
  settings = null;
  panels: any[] = [];
  id: number;
  resource: any;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _resourceService: ResourceService,
    private _toastrService: ToastrService,
    private _coookies: CookieService,
  ) {}

  ngOnInit(): void {
    const selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
    this._resourceService.getResourceSettings(selectedResourceId).subscribe(({ body }) => {
      if (body.statusCode === 500) {
        this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
        return;
      }
      this.settings = body;
    });
    this.panels = [
      {
        id: 'general',
        icon: 'heroicons_outline:clipboard-check',
        title: 'ORGANIZATION.SETTINGS.RESOUCES.GENERAL',
        description: 'ORGANIZATION.SETTINGS.RESOUCES.PANAL_MESSAGE',
      },
      {
        id: 'status',
        icon: 'heroicons_outline:refresh',
        title: 'ORGANIZATION.SETTINGS.RESOUCES.STATUS',
        description: 'ORGANIZATION.SETTINGS.RESOUCES.STATUS_MESSAGE',
      },
      {
        id: 'visibility',
        icon: 'heroicons_outline:eye',
        title: 'ORGANIZATION.SETTINGS.RESOUCES.VISIBILITY',
        description: 'ORGANIZATION.SETTINGS.RESOUCES.VISIBILITY_MESSAGE',
      },
      {
        id: 'properties',
        icon: 'heroicons_outline:view-list',
        title: 'ORGANIZATION.SETTINGS.RESOUCES.PROPERTIES',
        description: 'ORGANIZATION.SETTINGS.RESOUCES.PROPERTIES_MESSAGE',
      },
    ];
    this._changeDetectorRef.markForCheck();
  }

  changeSelectedPanel(selectedPanel) {
    this.selectedPanel = selectedPanel;
  }
}
