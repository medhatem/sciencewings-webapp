import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, Subject, debounceTime, map, merge, switchMap, takeUntil } from 'rxjs';

import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ResourceService } from './../../resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { fuseAnimations } from '@fuse/animations';

export interface ResourceType {
    name: string;
    resourceType: number;
    timeEfficiency: number;
    timezone: string;
}
@Component({
    selector: 'app-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.scss'],
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class ResourceComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    resources = [];
    isLoading: boolean = false;
    selectedProduct = null;

    searchInputControl: FormControl = new FormControl();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _resourceService: ResourceService,
        private _toastrService: ToastrService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
        this._resourceService.getOrgResource().subscribe(({ statusCode, body, errorMessage }) => {
            if (statusCode === 500) {
                this._toastrService.showError(errorMessage, 'Something went wrong!');
            }
            this.resources = body.resources;
            console.log({ resources: this.resources });
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
                disableClear: true
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;

                    // Close the details
                    this.closeDetails();
                });

            // Get products if sort or page changes
            /* merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    // return this._inventoryService.getProducts(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe(); */
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
     trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    /**
     * Close the details
     */
    closeDetails(): void {
        this.selectedProduct = null;
    }

    /**
     * Create resource
     */
    createResource(): void {
    }

    /**
     * Toggle product details
     *
     * @param productId
     */
    toggleDetails(productId: string): void {
    }

}
