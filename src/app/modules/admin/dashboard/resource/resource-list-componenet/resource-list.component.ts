import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FuseNavigationItem, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Subject, lastValueFrom, takeUntil, debounceTime, switchMap, map } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';
import { ListOption } from '../../reusable-components/list/list-component.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GetResource, Resource, ResourceListItem } from 'app/models/resources/resource';
import { ResourceProfileFormComponent } from '../resource-form/profile-form.component';
import { ResourceService } from '../../../resolvers/resource/resource.service';
import { Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { Pagination } from 'app/models/pagination/IPagination';

export interface ResourceType {
  name: string;
  resourceType: number;
  timeEfficiency: number;
  timezone: string;
}

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
})
export class ResourceListComponent implements OnInit, OnDestroy {
  @Output() messageEvent = new EventEmitter<string>();
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  resources = [];
  isLoading: boolean = false;
  options: ListOption = { columns: [] };
  selectedResource = null;
  openedDialogRef: any;
  resourcesCount: number = 0;
  pagination: Pagination;

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
    this._resourceService.resources$.pipe(takeUntil(this._unsubscribeAll)).subscribe((resources: ResourceListItem[]) => {
      this.resources = resources;
      this.resourcesCount = resources?.length;
    });
    this._resourceService.resourcesPaginated$.subscribe((resources) => {
      this.resources = resources;

      this._changeDetectorRef.markForCheck();
    });

    this._resourceService.pagination$.subscribe((pagination) => {
      this.pagination = pagination;

      this._changeDetectorRef.markForCheck();
    });
    this.options = {
      columns: [
        { columnName: 'ORGANIZATION.SETTINGS.RESOUCES.NAME', columnPropertyToUse: 'name', customClass: '' },

        { columnName: 'ORGANIZATION.SETTINGS.RESOUCES.CLASS', columnPropertyToUse: 'resourceClass', customClass: 'hidden' },
        {
          columnName: 'ORGANIZATION.SETTINGS.RESOUCES.TYPE',
          columnPropertyToUse: 'resourceType',
          customClass: 'hidden',
        },
        {
          columnName: 'ORGANIZATION.SETTINGS.RESOUCES.STATUS',
          columnPropertyToUse: 'active',
          customClass: 'hidden',
        },
        { columnName: 'ORGANIZATION.INFRASTRUCTURES.INFRASTRUCTURE_LIST.DATE', columnPropertyToUse: 'dateStart', customClass: 'hidden' },
      ],
      onElementClick: this.onElementSelected.bind(this),
    };
    this._changeDetectorRef.markForCheck();

    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.isLoading = true;
          return this._resourceService.getAndParseOrganizationResource(this.pagination.page, this.pagination.size, query);
        }),
        map(() => {
          this.isLoading = false;
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
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

  async pageEvent(event: PageEvent) {
    this.pagination = {
      ...this.pagination,
      length: event.length,
      size: event.pageSize,
      page: event.pageIndex,
      lastPage: event.previousPageIndex,
    };
    await lastValueFrom(this._resourceService.getAndParseOrganizationResource(this.pagination.page, this.pagination.size));
  }

    openCreateDialog(): void {
    const orgID = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    if (!orgID) {
      this._toastrService.showError('Something went wrong!');
    }
    this.openedDialogRef = this._matDialog.open(ResourceProfileFormComponent, {
      data: { orgID },
    });
     this.openedDialogRef.afterClosed().subscribe((result) => {
       lastValueFrom(this._resourceService.getAndParseOrganizationResource());
     });
  }

  async onElementSelected(resource: GetResource) {
    const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');

    // Return if the navigation component does not exist
    if (!navComponent) {
      return null;
    }

    const newNavigation: FuseNavigationItem[] = [
      {
        id: 'general-components',
        title: 'Resource',
        subtitle: resource?.name,
        type: 'group',
        children: [
          {
            id: 'supported-components.general',
            title: 'Resource',
            type: 'basic',
            icon: 'heroicons_outline:cube',
            link: 'resources/resource/profile/' + resource?.id,
          },
          {
            id: 'supported-components.schedule',
            title: 'Schedule',
            type: 'basic',
            icon: 'heroicons_outline:calendar',
            link: 'resources/resource/schedule/' + resource?.id,
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
    this._coookies.set('resourceID', resource?.id?.toString());
    this._router.navigateByUrl('resources/resource/profile/' + resource?.id);
  }
}
