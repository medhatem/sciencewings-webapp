import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { debounceTime, lastValueFrom, map, Subject, switchMap, takeUntil } from 'rxjs';
import { ListOption } from '../../../reusable-components/list/list-component.component';
import { FormControl } from '@angular/forms';
import { Infrastructure, InfrastructureListItem } from 'app/models/infrastructures/infrastructure';
import { InfrastructureService } from 'app/modules/admin/resolvers/infrastructure/infrastructure.service';
import { constants } from 'app/shared/constants';
import { InfrastructureFormComponent } from '../infrastructure-form/infrastructure-form.component';
import { Pagination } from 'app/models/pagination/IPagination';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-infrastructure-list',
  templateUrl: './infrastructure-list.component.html',
})
export class InfrastructureListComponent implements OnInit, OnDestroy {
  infrastructures: any[] = [];
  isLoading: boolean = false;
  infrastructuresCount: number = 0;
  options: ListOption = { columns: [], numberOfColumns: 5 };
  openedDialogRef: any;
  searchInputControl: FormControl = new FormControl();
  pagination: Pagination;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _infrastructureService: InfrastructureService,
    private _matDialog: MatDialog,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._infrastructureService.infrastructurePaginated$.subscribe((infrastructures) => {
      takeUntil(this._unsubscribeAll);
      this.infrastructures = infrastructures;
      this.infrastructuresCount = infrastructures.length;

      this._changeDetectorRef.markForCheck();
    });

    this._infrastructureService.pagination$.subscribe((pagination) => {
      takeUntil(this._unsubscribeAll);
      this.pagination = pagination;

      this._changeDetectorRef.markForCheck();
    });

    this.options = {
      columns: [
        { columnName: 'ORGANIZATION.INFRASTRUCTURES.INFRASTRUCTURE_LIST.TITLE', columnPropertyToUse: 'name', customClass: '' },
        { columnName: 'ORGANIZATION.INFRASTRUCTURES.INFRASTRUCTURE_LIST.KEY', columnPropertyToUse: 'key', customClass: 'hidden' },
        {
          columnName: 'ORGANIZATION.INFRASTRUCTURES.INFRASTRUCTURE_LIST.RESPONSIBLE',
          columnPropertyToUse: 'responsible',
          customClass: 'hidden',
        },
        {
          columnName: 'ORGANIZATION.INFRASTRUCTURES.INFRASTRUCTURE_LIST.RESOURCES_NB',
          columnPropertyToUse: 'resourcesNb',
          customClass: 'hidden',
        },
        { columnName: 'ORGANIZATION.INFRASTRUCTURES.INFRASTRUCTURE_LIST.DATE', columnPropertyToUse: 'dateStart', customClass: 'hidden' },
      ],
      onElementClick: this.onElementSelected.bind(this),
      numberOfColumns: 5,
    };

    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.isLoading = true;
          return this._infrastructureService.getAndParseOrganizationInfrastructures(this.pagination.page, this.pagination.size, query);
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

  async pageEvent(event: PageEvent) {
    this.pagination = {
      ...this.pagination,
      length: event.length,
      size: event.pageSize,
      page: event.pageIndex,
      lastPage: event.previousPageIndex,
    };
    await lastValueFrom(this._infrastructureService.getAndParseOrganizationInfrastructures(this.pagination.page, this.pagination.size));
  }

  openCreateInfrastructureDialog(): void {
    const orgID = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    if (!orgID) {
      this._toastrService.showError('Something went wrong!');
    }
    this.openedDialogRef = this._matDialog.open(InfrastructureFormComponent, {
      data: { orgID },
    });
    this.openedDialogRef.afterClosed().subscribe((result) => {
      lastValueFrom(this._infrastructureService.getAndParseOrganizationInfrastructures());
    });
  }

  async onElementSelected(infrastructure: InfrastructureListItem) {
    localStorage.setItem(constants.CURRENT_INFRASTRUCTURE_ID, `${infrastructure.id}`);
    this._router.navigate([`/resources/Infrastructure/infrastructure-settings/${infrastructure.id}`]);
  }
}
