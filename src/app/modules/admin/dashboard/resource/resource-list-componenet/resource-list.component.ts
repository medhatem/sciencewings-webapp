import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ResourceService } from '../../../resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { Router } from '@angular/router';
import { FuseNavigationItem, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { CookieService } from 'ngx-cookie-service';

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
  selectedResource = null;

  searchInputControl: FormControl = new FormControl();
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _resourceService: ResourceService,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _fuseNavigationService: FuseNavigationService,
    private _coookies: CookieService,
  ) {}

  ngOnInit(): void {
    this._resourceService.getOrgResource(1).subscribe(({ body }) => {
      if (body.statusCode === 500) {
        this._toastrService.showError('Something went wrong!');
      }

      this.resources = body.data;
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
        this._toastrService.showError('Something went wrong!');
      }

      this.selectedResource = body.data[0];
    });
  }

  onDelete(id: number) {
    this._resourceService.deleteResource(id).subscribe(({ statusCode, body, errorMessage }) => {
      if (statusCode === 500) {
        this._toastrService.showError(errorMessage, 'Something went wrong!');
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
        id: 'supported-components',
        title: 'Resource settings',
        subtitle: resourceName,
        type: 'group',
        children: [
          {
            id: 'supported-components.apex-charts',
            title: 'Resource',
            type: 'basic',
            icon: 'heroicons_outline:cube',
            link: 'resources/resource/create/' + resourceID,
          },
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
}
