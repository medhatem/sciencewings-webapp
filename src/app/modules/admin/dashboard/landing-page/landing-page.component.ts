import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { UserOrganizations } from 'app/models/organizations/user-organizations';
import { constants } from 'app/shared/constants';
import { Subject, takeUntil } from 'rxjs';
import { AdminOrganizationsService } from '../../resolvers/admin-organization/admin-organization.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  readonly organizationProfilePath = `/${constants.MODULES_ROUTINGS_URLS.ADMIN}/${constants.MODULES_ROUTINGS_CHILDREN_URLS.ADMIN.ORGANIZATION_PROFILE}`;
  readonly fullCreateOrganizationPath = [this.organizationProfilePath, 'create'];
  organizations: UserOrganizations[] = [];
  isLoading: boolean = false;

  constructor(private _toastrService: ToastrService, private _adminOrganizationsService: AdminOrganizationsService, private _router: Router) {}

  ngOnInit() {
    this.fetchUserOrganizations();
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
    this._router.navigate([this.organizationProfilePath, org.id]);
  }

  /**
   * Get the organizations where the current connected user is member of.
   *
   * @returns void
   */
  private fetchUserOrganizations() {
    const userId = localStorage.getItem(constants.CURRENT_USER_ID);
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
