import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, lastValueFrom, map, switchMap, takeUntil } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { GroupFormComponent } from '../group-form/group-form.component';
import { GroupService } from 'app/modules/admin/resolvers/groups/groups.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ListOption } from '../../reusable-components/list/list-component.component';
import { Group } from 'app/models/groups/group';
import { constants } from 'app/shared/constants';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { Pagination } from 'app/models/pagination/IPagination';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit, OnDestroy {
  @Input() organizationId: number;
  groups: Group[] = [];
  isLoading: boolean = false;
  selectedGroup = null;
  groupsCount: number = 0;
  memberCount: number = 0;
  pagination: Pagination;
  searchInputControl: FormControl = new FormControl();
  options: ListOption = { columns: [] };
  openedDialogRef: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _groupService: GroupService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.options = {
      columns: [
        { columnName: 'ORGANIZATION.GROUPS.LIST.GROUP_NAME', columnPropertyToUse: 'name', customClass: '' },
        { columnName: 'ORGANIZATION.GROUPS.LIST.GROUP_MEMBERS', columnPropertyToUse: 'members', customClass: 'hidden' },
        { columnName: 'ORGANIZATION.GROUPS.LIST.GROUP_STATUS', columnPropertyToUse: 'status', customClass: 'hidden' },
        { columnName: 'ORGANIZATION.GROUPS.LIST.GROUP_DATE', columnPropertyToUse: 'createdAt', customClass: 'hidden' },
      ],
      numberOfColumns: 4,
    };

    const data = this._route.snapshot.data;
    this.groupsCount = data.groups.length;
    this._groupService.paginatedGroups$.pipe(takeUntil(this._unsubscribeAll)).subscribe((organizationGroups: Group[]) => {
      this.groups = organizationGroups;
      this._changeDetectorRef.markForCheck();
    });
    this._groupService.pagination$.subscribe((result) => {
      takeUntil(this._unsubscribeAll);
      this.pagination = result;
      this._changeDetectorRef.markForCheck();
    });

    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.isLoading = true;
          return this._groupService.getAndParseOrganizationGroups(this.pagination.page, this.pagination.size, query);
          // return this._groupService.getGroups(0, 10, 'name', 'asc', query);
        }),
        map(() => {
          this.isLoading = false;
        }),
      )
      .subscribe();
  }

  // handlePageEvent(event: PageEvent) {
  //   this.pagination.length = event.length;
  //   this.pagination.size = event.pageSize;
  //   this.pagination.page = event.pageIndex;
  //   lastValueFrom(this._groupService.getGroups(event.pageIndex, event.pageSize));
  // }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  openGroupForm(): void {
    this._matDialog
      .open(GroupFormComponent)
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async () => {
        await lastValueFrom(this._groupService.getAndParseOrganizationGroups(this.pagination.page, this.pagination.size));
        this._changeDetectorRef.markForCheck();
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
    const orgId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    await lastValueFrom(this._groupService.getAndParseOrganizationGroups(this.pagination.page, this.pagination.size));
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  closeDetails(): void {
    this.selectedGroup = null;
  }
}
