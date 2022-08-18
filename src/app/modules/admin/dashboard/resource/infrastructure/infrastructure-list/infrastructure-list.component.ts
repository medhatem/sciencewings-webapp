import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { debounceTime, lastValueFrom, map, Subject, switchMap, takeUntil } from 'rxjs';
import { ListOption } from '../../../reusable-components/list/list-component.component';
import { FormControl } from '@angular/forms';
import { Infrastructure } from 'app/models/infrastructures/infrastructure';
import { InfrastructureService } from 'app/modules/admin/resolvers/infrastructure/infrastructure.service';
import { constants } from 'app/shared/constants';
import { InfrastructureFormComponent } from '../infrastructure-form/infrastructure-form.component';
@Component({
  selector: 'app-infrastructure-list',
  templateUrl: './infrastructure-list.component.html',
})
export class InfrastructureListComponent implements OnInit, OnDestroy {
  infrastructures: any[] = [];
  isLoading: boolean = false;
  infrastructuresCount: number = 0;
  options: ListOption = { columns: [], numnberOfColumns: 3 };
  openedDialogRef: any;
  searchInputControl: FormControl = new FormControl();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _infrastructureService: InfrastructureService,
    private _matDialog: MatDialog,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.options = {
      columns: [
        { columnName: 'Infrastructure', columnPropertyToUse: 'name', customClass: '' },
        { columnName: 'Key', columnPropertyToUse: 'key', customClass: 'hidden' },
        // { columnName: 'Responsible', columnPropertyToUse: 'responsibles', customClass: 'hidden' },
        { columnName: 'Created Date', columnPropertyToUse: 'dateStart', customClass: 'hidden' },
      ],
      numnberOfColumns: 3,
    };

    this._infrastructureService.infrastructures$.pipe(takeUntil(this._unsubscribeAll)).subscribe((infrastructures: Infrastructure[]) => {
      this.infrastructures = infrastructures;
      this.infrastructuresCount = infrastructures.length;
      this._changeDetectorRef.markForCheck();
    });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
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
}
