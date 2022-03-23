import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';

import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ResourceService } from '../../../resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'app/data.service';

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

  constructor(private _resourceService: ResourceService, private _toastrService: ToastrService, private _changeDetectorRef: ChangeDetectorRef, private data: DataService) {}

  ngOnInit(): void {
    this._resourceService.getOrgResource().subscribe(({ statusCode, body, errorMessage }) => {
      if (statusCode === 500) {
        this._toastrService.showError(errorMessage, 'Something went wrong!');
      }
      console.log({ body });

      this.resources = body.resources;
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

      // Mark for check
      this._changeDetectorRef.markForCheck();

      // If the user changes the sort order...
      this._sort.sortChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
        // Reset back to the first page
        this._paginator.pageIndex = 0;

        // Close the details
        this.closeDetails();
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
   * Create resource
   */
  createResource(): void {}

  /**
   * Toggle product details
   *
   * @param productId
   */
  toggleDetails(resourceId: number): void {
    // If the product is already selected...
    if (this.selectedResource && this.selectedResource.id === resourceId) {
      // Close the details
      this.closeDetails();
      return;
    }

    this._resourceService.getResource(resourceId).subscribe(({ statusCode, body, errorMessage }) => {
      if (statusCode === 500) {
        this._toastrService.showError(errorMessage, 'Something went wrong!');
      }
      this.selectedResource = body;
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

  showResourceProfile(id) {
    console.log({ id });
    this.data.changeMessage({ resource: id });
  }
}
