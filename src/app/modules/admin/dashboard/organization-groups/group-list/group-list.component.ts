import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { GroupFormComponent } from '../group-form/group-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { DataService } from 'app/data.service';
import { GroupService } from 'app/modules/admin/resolvers/groups/groups.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() messageEvent = new EventEmitter<string>();
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  groups: any[] = [];
  isLoading: boolean = false;
  selectedGroup = null;
  groupsCount: number = 0;
  searchInputControl: FormControl = new FormControl();
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _groupService: GroupService,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private data: DataService,
  ) {}

  ngOnInit(): void {
    this.groups = [{ name: 'Admin', member: 3, status: 'Activate', date: 'April 29, 2022' }];
    this.groups = [{ name: 'Aprovers', member: 2, status: 'Activate', date: 'April 29, 2022' }];
    this.groups = [{ name: 'Managers', member: 2, status: 'Activate', date: 'April 29, 2022' }];
    this.groups = [{ name: 'Supervisors', member: 5, status: 'Activate', date: 'April 29, 2022' }];
    this.groups = [{ name: 'Humaine Resources', member: 5, status: 'Activate', date: 'April 29, 2022' }];
    this.groupsCount = this.groups.length;
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
