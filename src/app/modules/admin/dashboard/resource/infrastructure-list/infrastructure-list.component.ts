import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { debounceTime, lastValueFrom, map, Subject, switchMap, takeUntil } from 'rxjs';
import { ListOption } from '../../reusable-components/list/list-component.component';
import { ResourceService } from '../../../resolvers/resource/resource.service';
import { FormControl } from '@angular/forms';
import { Infrastructure } from 'app/models/infrastructures/infrastructure';

@Component({
  selector: 'app-infrastructure-list',
  templateUrl: './infrastructure-list.component.html',
})
export class InfrastructureListComponent implements OnInit, OnDestroy {
  infrastructures: any[] = [];
  isLoading: boolean = false;
  infrastructuresCount: number = 0;
  options: ListOption = { columns: [], numnberOfColumns: 5 };
  openedDialogRef: any;
  searchInputControl: FormControl = new FormControl();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _infrastructureService: ResourceService,
    private _matDialog: MatDialog,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.options = {
      columns: [
        { columnName: 'Infrastructure', columnPropertyToUse: 'name', customClass: '' },
        { columnName: 'Responsable', columnPropertyToUse: 'responsibles', customClass: 'hidden' },
        { columnName: '# Resources', columnPropertyToUse: 'resources', customClass: 'hidden' },
        { columnName: 'Created Date', columnPropertyToUse: 'dateStart', customClass: 'hidden' },
        { columnName: 'Sub-Infrastructures', columnPropertyToUse: 'parent', customClass: 'hidden' },
      ],
      numnberOfColumns: 5,
    };
    this._infrastructureService.infrastructures$.subscribe((infrastructures: Infrastructure[]) => {
      this.infrastructures = infrastructures;
      console.log(this.infrastructures);
      this.infrastructuresCount = infrastructures.length;
      this._changeDetectorRef.markForCheck();
      // Subscribe to search input field value changes
      this.searchInputControl.valueChanges
        .pipe(
          takeUntil(this._unsubscribeAll),
          debounceTime(300),
          switchMap((query) => {
            this.isLoading = true;
            return this._infrastructureService.getInfrastructures(0, 10, 'name', 'asc', query);
          }),
          map(() => {
            this.isLoading = false;
          }),
        )
        .subscribe();
    });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
