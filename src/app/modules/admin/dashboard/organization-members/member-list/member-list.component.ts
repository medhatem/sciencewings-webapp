import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MemberFormComponent } from '../member-form/member-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { DataService } from 'app/data.service';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { MatDialog } from '@angular/material/dialog';

/*
export interface MemberType {
  id: number;
  name: string;
  role: string;
  status: string;
  date: string | Date ;
}

export interface UpdateMemberType {
  profil?: string;
  role?: string;
  status?: string;
  date?: string | Date ;
}
*/

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})

export class MemberListComponent implements OnInit, AfterViewInit, OnDestroy {
 @Output() messageEvent = new EventEmitter<string>();
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  members: any[]= [];
  isLoading: boolean = false;
  selectedMember = null;
  membersCount: number = 0;
  searchInputControl: FormControl = new FormControl();
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _memberService: MemberService,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private data: DataService,
    ) {}

  ngOnInit(): void {
    // this._memberService.getOrgMembers(1).subscribe(({ body }) => {
    //   console.log({ body });
    //   if (body.statusCode === 500) {
    //     this._toastrService.showError('Something went wrong!');
    //   }
    //   this.members = body.data;
    //   });
    this.members = [{name: 'Nasro', status: 'Soheyb'} ];
    this.membersCount = this.members.length;

    }
    /**
     * After view init
     */
  ngAfterViewInit(): void {
    if (this._sort && this._paginator) {
        // Set the initial sort
      this._sort.sort({
        id: 'memberProfil',
        start: 'asc',
        disableClear: true,
      });
    }
  }
    /**
     * On destroy
     */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
/**   * Open Invite Member Form  */

  openMemberForm(): void {
    const dialogRef = this._matDialog.open(MemberFormComponent);

    dialogRef.afterClosed().subscribe((result) =>{
      console.log('Compose dialog was closed!');
    });

  }


    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

    /**
     * Close the details
     */
  closeDetails(): void {
    this.selectedMember = null;
  }

    /**
     * Toggle product details
     *
     * @param productId
     */
  toggleDetails(memberId: number): void {
    // If the product is already selected...
    if (this.selectedMember && this.selectedMember.id === memberId) {
      // Close the details
      this.closeDetails();
      return;
    }

    this._memberService.getOrgMembers(memberId).subscribe(({ body }) => {
      if (body.statusCode === 500) {
        this._toastrService.showError('Something went wrong!');
      }

      this.selectedMember = body.data[0];
    });
  }

  onDelete(id: number) {
    this._memberService.deleteMember(id).subscribe(({ statusCode, body, errorMessage }) => {
      if (statusCode === 500) {
        this._toastrService.showError(errorMessage, 'Something went wrong!');
      } else {
        this.members = this.members.filter((member) => member.id !== id);
      }
    });
  }

  showMemberProfile(memberID) {
    this.data.changeMessage({ memberID });
  }
}
