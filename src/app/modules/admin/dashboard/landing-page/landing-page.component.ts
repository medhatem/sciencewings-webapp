import { Component, EventEmitter, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { UserOrganizations } from 'app/models/organizations/user-organizations';
import { constants } from 'app/shared/constants';
import { interval, map, retryWhen, Subject, takeUntil, tap } from 'rxjs';
import { AdminOrganizationsService } from '../../resolvers/admin-organization/admin-organization.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent implements OnInit, OnDestroy {
  readonly organizationProfilePath = `/${constants.MODULES_ROUTINGS_URLS.ADMIN}/${constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.ORGANIZATION_PROFILE}`;
  readonly fullCreateOrganizationPath = [this.organizationProfilePath, 'create'];
  organizations: UserOrganizations[] = [];
  isLoading: boolean = false;
  selectOrganizationEvent = new EventEmitter();

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _userSelected: Subject<boolean> = new Subject<boolean>();

  constructor(private _toastrService: ToastrService, private _adminOrganizationsService: AdminOrganizationsService, private _router: Router) {}

  ngOnInit() {
    //TODO : the same behavior is in SwitchOrganizationComponent
    // probably is/will be needed is other places
    // so we have to move it to helper file do be reusublae
    /**
     * loops on the get current user id, until it is available. then subscibes
     * to userOrganizations one the user is selected and available is localStorage
     */
    interval(300)
      .pipe(
        map(() => {
          const userId = localStorage.getItem(constants.CURRENT_USER_ID);
          if (!Number(userId)) {
            throw new Error('No user selected');
          }
          this._userSelected.next(true);
          this._userSelected.complete();
          this.fetchUserOrganizations();
          return userId;
        }),
        retryWhen((error) => error.pipe(tap())),
        takeUntil(this._userSelected),
      )
      .subscribe({
        next: (val) => val,
        error: (err) => err,
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

  /**
   * Redirects to organization profile by it's id
   *
   * @param org
   */
  navigateToOrganizationProfilePage(org: UserOrganizations) {
    localStorage.setItem(constants.CURRENT_ORGANIZATION_ID, `${org.id}`);
    this.selectOrganizationEvent.emit(org.id);
  }

  /**
   * Get the organizations where the current connected user is member of.
   *
   * @returns void
   */
  private fetchUserOrganizations() {
    const userId = localStorage.getItem(constants.CURRENT_USER_ID);
    console.log('userId', userId);

    this._adminOrganizationsService
      .getAllUserOrganizations(Number(userId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (organizations) => (this.organizations = organizations),
        error: (error) => {
          this.organizations = [];
          this._toastrService.showError(constants.ERROR_LOADING_ORGANIZATIONS);
        },
      });
  }
}
