import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, debounceTime, lastValueFrom, map, switchMap, takeUntil } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { GroupFormComponent } from '../group-form/group-form.component';
import { GroupService } from 'app/modules/admin/resolvers/groups/groups.service';
import { InventoryPagination } from '../../organization-profile/profile/organization-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { ListOption } from '../../reusable-components/list/list-component.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  groups$: any = [];
  isLoading: boolean = false;
  selectedGroup = null;
  groupsCount: number = 0;
  pagination: InventoryPagination;
  searchInputControl: FormControl = new FormControl();
  options: ListOption = { columns: [] };

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _groupService: GroupService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.options = {
      columns: [
        { columnName: 'name', columnPropertyToUse: 'name', customClass: '' },
        { columnName: 'Status', columnPropertyToUse: 'status', customClass: 'hidden' },
        { columnName: 'Members', columnPropertyToUse: 'members', customClass: 'hidden' },
        { columnName: 'Date', columnPropertyToUse: 'date', customClass: 'hidden' },
      ],
    };

    const { groups } = this._route.snapshot.data;
    this._groupService.pagination$.pipe(takeUntil(this._unsubscribeAll)).subscribe((pagination: InventoryPagination) => {
      this.pagination = pagination;
      this._changeDetectorRef.markForCheck();
    });

    this.groups$ = this._groupService.groups$;
    this.groupsCount = groups.length;

    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.closeDetails();
          this.isLoading = true;
          return this._groupService.getGroups(0, 10, 'name', 'asc', query);
        }),
        map(() => {
          this.isLoading = false;
        }),
      )
      .subscribe();
  }

  handlePageEvent(event: PageEvent) {
    this.pagination.length = event.length;
    this.pagination.size = event.pageSize;
    this.pagination.page = event.pageIndex;
    lastValueFrom(this._groupService.getGroups(event.pageIndex, event.pageSize));
  }

  ngAfterViewInit(): void {
    if (this._sort && this._paginator) {
      this._sort.sort({
        id: 'groupProfil',
        start: 'asc',
        disableClear: true,
      });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  openGroupForm(): void {
    this._matDialog
      .open(GroupFormComponent)
      .afterClosed()
      .subscribe((result) => {});
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  closeDetails(): void {
    this.selectedGroup = null;
  }

  showGroupProfile(groupID) {
    //TODO
  }

  createGroup() {}
}
