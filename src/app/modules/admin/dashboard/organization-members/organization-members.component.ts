import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ListOption } from '../reusable-components/list/list-component.component';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'app/models/Member';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberService } from '../../resolvers/members/member.service';
import { Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { debounceTime, lastValueFrom, map, Subject, switchMap, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'organizationmembers',
  templateUrl: './organization-members.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationMemebrsComponent implements OnInit {
  members: any[] = [];
  isLoading: boolean = false;
  membersCount: number = 0;
  options: ListOption = { columns: [], numnberOfColumns: 5 };
  openedDialogRef: any;
  searchInputControl: FormControl = new FormControl();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _memberService: MemberService,
    private _matDialog: MatDialog,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.options = {
      columns: [
        { columnName: 'Profile', columnPropertyToUse: 'profile', customClass: '' },
        { columnName: 'Role', columnPropertyToUse: 'role', customClass: 'hidden' },
        { columnName: 'Status', columnPropertyToUse: 'status', customClass: 'hidden' },
        { columnName: 'Joined', columnPropertyToUse: 'date', customClass: 'hidden' },
        { columnName: 'Actions', columnPropertyToUse: '', customClass: 'hidden' },
      ],
      numnberOfColumns: 5,
      onElementClick: this.onElementSelected.bind(this),
    };

    this._memberService.members$.subscribe((members: Member[]) => {
      this.members = members;
      this.membersCount = members.length;
      this._changeDetectorRef.markForCheck();
      // Subscribe to search input field value changes
      this.searchInputControl.valueChanges
        .pipe(
          takeUntil(this._unsubscribeAll),
          debounceTime(300),
          switchMap((query) => {
            this.isLoading = true;
            return this._memberService.getMembers(0, 10, 'name', 'asc', query);
          }),
          map(() => {
            this.isLoading = false;
          }),
        )
        .subscribe();
    });
  }

  openInviteMemberDialog(): void {
    const orgID = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    if (!orgID) {
      this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
    }
    this.openedDialogRef = this._matDialog.open(MemberFormComponent, {
      data: { orgID },
    });
    this.openedDialogRef.afterClosed().subscribe((result) => {
      lastValueFrom(this._memberService.getAndParseOrganizationMember());
    });
  }

  async onElementSelected(item: Member) {
    this._router.navigate(['/admin/organization-members/memberProfile', item.organization, item.user]);
  }
}
