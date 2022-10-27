import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, debounceTime, lastValueFrom, map, switchMap, takeUntil } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { GroupFormComponent } from '../group-form/group-form.component';
import { GroupService } from 'app/modules/admin/resolvers/groups/groups.service';
import { InventoryPagination } from '../../organization-profile/profile/organization-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListOption } from '../../reusable-components/list/list-component.component';
import { Group } from 'app/models/groups/group';
import { constants } from 'app/shared/constants';
import { ToastrService } from 'app/core/toastr/toastr.service';

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
  pagination: InventoryPagination;
  searchInputControl: FormControl = new FormControl();
  options: ListOption = { columns: [] };
  openedDialogRef: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _groupService: GroupService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private _route: ActivatedRoute,
    private _toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    const data = this._route.snapshot.data;
    this.groupsCount = data.groups.length;
    this._groupService.groups$.pipe(takeUntil(this._unsubscribeAll)).subscribe((organizationGroups: Group[]) => {
      this.groups = organizationGroups;
    });
    this.options = {
      columns: [
        { columnName: 'name', columnPropertyToUse: 'name', customClass: '' },
        { columnName: 'Status', columnPropertyToUse: 'status', customClass: 'hidden' },
        { columnName: 'Members', columnPropertyToUse: 'members', customClass: 'hidden' },
        { columnName: 'Description', columnPropertyToUse: 'description', customClass: 'hidden' },
      ],
      numnberOfColumns: 5,
    };
    this._changeDetectorRef.markForCheck();
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
        await lastValueFrom(this._groupService.getAndParseOrganizationGroups(Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID))));
        this._changeDetectorRef.markForCheck();
      });
  }
}
