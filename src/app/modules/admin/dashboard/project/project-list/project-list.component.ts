import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectService } from 'app/modules/admin/resolvers/project/project.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { InventoryPagination } from '../../organization-profile/profile/organization-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'app/data.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, lastValueFrom, map, Subject, switchMap, takeUntil } from 'rxjs';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  groups$: any;
  isLoading: boolean = false;
  selectedGroup = null;
  groupsCount: number = 0;
  pagination: InventoryPagination;
  searchInputControl: FormControl = new FormControl();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _groupService: ProjectService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private data: DataService,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
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
    const dialogRef = this._matDialog.open(ProjectFormComponent);
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
