import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, debounceTime, lastValueFrom, map, switchMap, takeUntil } from 'rxjs';

import { FormControl } from '@angular/forms';
import { InventoryPagination } from '../../organization-profile/profile/organization-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MemberFormComponent } from '../member-form/member-form.component';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { members } from 'app/mock-api/apps/tasks/data';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  members$: any;
  isLoading: boolean = false;
  selectedMember = null;
  membersCount: number = 0;
  pagination: InventoryPagination;
  searchInputControl: FormControl = new FormControl();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _memberService: MemberService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toastrService: ToastrService,
    private _matDialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this._memberService.pagination$.pipe(takeUntil(this._unsubscribeAll)).subscribe((pagination: InventoryPagination) => {
      this.pagination = pagination;
      this._changeDetectorRef.markForCheck();
    });
    this.members$ = this._memberService.members$;
    this.membersCount = members.length;
    // Subscribe to search input field value changes
    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.closeDetails();
          this.isLoading = true;
          return this._memberService.getMembers(0, 10, 'name', 'asc', query);
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
    lastValueFrom(this._memberService.getMembers(event.pageIndex, event.pageSize));
  }

  ngAfterViewInit(): void {
    if (this._sort && this._paginator) {
      this._sort.sort({
        id: 'memberProfil',
        start: 'asc',
        disableClear: true,
      });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  openMemberForm(): void {
    const dialogRef = this._matDialog.open(MemberFormComponent);
    dialogRef.afterClosed().subscribe((result) => {});
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  closeDetails(): void {
    this.selectedMember = null;
  }

  toggleDetails(memberId: number): void {
    if (this.selectedMember && this.selectedMember.id === memberId) {
      this.closeDetails();
      return;
    }

    this._memberService.getOrgMembers(memberId).subscribe(({ body }) => {
      this.selectedMember = body.data[0];
    });
  }

  onDelete(id: number) {
    this._memberService.deleteMember(id).subscribe(({ statusCode, body, errorMessage }) => {
      if (statusCode === 500) {
        this._toastrService.showError(errorMessage, constants.SOMETHING_WENT_WRONG);
      } else {
        this.members$ = this.members$.filter((member) => member.id !== id);
      }
    });
  }

  showMemberProfile(memberID) {
    //TODO
  }
}
