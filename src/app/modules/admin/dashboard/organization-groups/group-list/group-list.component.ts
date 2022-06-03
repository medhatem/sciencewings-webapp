import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, lastValueFrom, map, Subject, switchMap, takeUntil } from 'rxjs';
import { GroupFormComponent } from '../group-form/group-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataService } from 'app/data.service';
import { MatDialog } from '@angular/material/dialog';
import { InventoryPagination } from '../../organization-profile/profile/organization-profile.component';
import { GroupService } from 'app/modules/admin/resolvers/groups/groups.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() messageEvent = new EventEmitter<string>();
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  groups$: any;
  isLoading: boolean = false;
  selectedGroup = null;
  groupsCount: number = 0;
  pagination: InventoryPagination;
  searchInputControl: FormControl = new FormControl();
  count = 0;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _groupService: GroupService, private _changeDetectorRef: ChangeDetectorRef, private _matDialog: MatDialog, private data: DataService) {}

  ngOnInit(): void {
    this._groupService.pagination$.pipe(takeUntil(this._unsubscribeAll)).subscribe((pagination: InventoryPagination) => {
      console.log('this.pagination', this.pagination, this.count);
      this.count++;
      this.pagination = pagination;
      this._changeDetectorRef.markForCheck();
    });

    this.groups$ = this._groupService.groups$;

    // Subscribe to search input field value changes
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
    const dialogRef = this._matDialog.open(GroupFormComponent);
    dialogRef.afterClosed().subscribe((result) => {});
  }
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  closeDetails(): void {
    this.selectedGroup = null;
  }

  showGroupProfile(groupID) {
    this.data.changeMessage({ groupID });
  }
}
