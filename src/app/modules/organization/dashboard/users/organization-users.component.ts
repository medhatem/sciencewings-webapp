import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { OrganizationUsersService } from '../../resolvers/users/organization-users.service';

@Component({
  selector: 'organization-users',
  templateUrl: './organization-users.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationUsersComponent implements OnInit, OnDestroy {
  teamMembers: any;
  selectedProject: string = 'ACME Corp. Backend App';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private _organizationUsersService: OrganizationUsersService, private _router: Router) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the data
    this._organizationUsersService.data$.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      // Store the data teamMembers
      this.teamMembers = data;
      this.teamMembers = data;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
