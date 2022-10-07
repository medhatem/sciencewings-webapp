import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FuseNavigationItem, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';
import { ListOption } from '../../reusable-components/list/list-component.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Resource } from 'app/models/resources/resource';
import { ResourceProfileFormComponent } from '../resource-form/profile-form.component';
import { ResourceService } from '../../../resolvers/resource/resource.service';
import { Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';

export interface ResourceType {
  name: string;
  resourceType: number;
  timeEfficiency: number;
  timezone: string;
}

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() messageEvent = new EventEmitter<string>();
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  resources = [];
  isLoading: boolean = false;
  options: ListOption = { columns: [], numnberOfColumns: 3 };
  selectedResource = null;
  openedDialogRef: any;
  resourcesCount: number = 0;

  searchInputControl: FormControl = new FormControl();
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _resourceService: ResourceService,
    private _matDialog: MatDialog,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _fuseNavigationService: FuseNavigationService,
    private _coookies: CookieService,
  ) {}

  ngOnInit(): void {
    this._resourceService.getOrgResource().subscribe(({ body }) => {
      this.resources = body.data;
      this.resourcesCount = this.resources.length;
    });
  }

  /**
   * After view init
   */
  ngAfterViewInit(): void {
    if (this._sort && this._paginator) {
      // Set the initial sort
      this._sort.sort({
        id: 'name',
        start: 'asc',
        disableClear: true,
      });
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
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

  /**
   * Close the details
   */
  closeDetails(): void {
    this.selectedResource = null;
  }

  /**
   * Toggle product details
   *
   * @param productId
   */
  toggleDetails(event, resourceId: number): void {
    event.stopPropagation();
    // If the product is already selected...
    if (this.selectedResource && this.selectedResource.id === resourceId) {
      // Close the details
      this.closeDetails();
      return;
    }

    this._resourceService.getResource(resourceId).subscribe(({ body }) => {
      if (body.statusCode === 500) {
        this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
      }

      this.selectedResource = body.data[0];
    });
  }

  onDelete(id: number) {
    this._resourceService.deleteResource(id).subscribe(({ statusCode, body, errorMessage }) => {
      if (statusCode === 500) {
        this._toastrService.showError(errorMessage, constants.SOMETHING_WENT_WRONG);
      } else {
        this.resources = this.resources.filter((resource) => resource.id !== id);
      }
    });
  }

  showResourceProfile(resourceName: string, resourceID: number) {
    const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');

    // Return if the navigation component does not exist
    if (!navComponent) {
      return null;
    }

    const newNavigation: FuseNavigationItem[] = [
      {
        id: 'general-components',
        title: 'Resource',
        subtitle: resourceName,
        type: 'group',
        children: [
          {
            id: 'supported-components.general',
            title: 'Resource',
            type: 'basic',
            icon: 'heroicons_outline:cube',
            link: 'resources/resource/profile/' + resourceID,
          },
          {
            id: 'supported-components.schedule',
            title: 'Schedule',
            type: 'basic',
            icon: 'heroicons_outline:calendar',
            link: 'resources/resource/schedule/' + resourceID,
          },
        ],
      },
      {
        id: 'supported-components',
        title: 'Settings',
        type: 'group',
        children: [
          {
            id: 'supported-components.full-calendar',
            title: 'General',
            type: 'basic',
            icon: 'heroicons_outline:adjustments',
            link: '/resources/resource/settings/general',
          },
          {
            id: 'supported-components.google-maps',
            title: 'Reservation',
            type: 'basic',
            icon: 'heroicons_outline:adjustments',
            link: '/resources/resource/settings/reservation',
          },
        ],
      },
    ];
    // Replace the navigation data
    navComponent.navigation = newNavigation;
    navComponent.refresh();
    this._coookies.set('resourceID', resourceID.toString());
    this._router.navigateByUrl('resources/resource/profile/' + resourceID);
  }

  openCreateDialog(): void {
    this.openedDialogRef = this._matDialog.open(ResourceProfileFormComponent, {});
    this.openedDialogRef.afterClosed().subscribe(async (result) => {
      const { body } = await lastValueFrom(this._resourceService.getOrgResource());
      if (body.statusCode === 500) {
        this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
      }

      this.resources = body.data;
    });
  }
}
