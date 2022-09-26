import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { User } from 'app/core/user/user.types';
import { UserOrganizations } from 'app/models/organizations/user-organizations';
import { constants } from 'app/shared/constants';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { interval, map, tap, retryWhen, Subject, takeUntil, lastValueFrom } from 'rxjs';

@Component({
  selector: 'switch-organization',
  templateUrl: './switch-organization.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'switch-organization',
})
export class SwitchOrganizationComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Output() onActiveOrganizationChange = new EventEmitter<number>();
  isNoOrganization: boolean = true;
  availableOrganizations: Array<UserOrganizations>;
  activeOrganization: UserOrganizations;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _userSelected: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _adminOrganizationsService: AdminOrganizationsService,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.subscribeToUserOrganizations();
    this.loopCheckForUserId();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  setActiveOrganization(organization: UserOrganizations, orgId?: number): void {
    if (orgId) {
      this.activeOrganization = this.availableOrganizations.find(({ id }) => id === orgId);
    } else {
      this.activeOrganization = organization;
    }
    this._changeDetectorRef.markForCheck();
    localStorage.setItem(constants.CURRENT_ORGANIZATION_ID, `${this.activeOrganization.id}`);
    this.onActiveOrganizationChange.emit(this.activeOrganization.id);
  }

  /**
   * loops on the get current user id from LocalStorage. then subscibes
   * to userOrganizations once the user is selected and available is localStorage.
   * and the user has organizations.
   */
  private loopCheckForUserId() {
    interval(1000)
      .pipe(
        map(async () => {
          const userId = this.checkIfUserExists();
          if (userId) {
            this.initUserOrganizations(userId);
            this.subscribeToUserOrganizations();
            this._userSelected.next(true);
            this._userSelected.complete();
          }
        }),
        retryWhen((error) => error.pipe(tap())),
        takeUntil(this._userSelected),
      )
      .subscribe({
        next: (val) => val,
      });
  }

  /**
   * Subscribe to getAllUserOrganizations() from AdminOrganizationService.
   * each time the getAllUserOrganizations is called, this.organizations are updated.
   */
  private subscribeToUserOrganizations() {
    this._adminOrganizationsService.userOrganiztions.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (organizations) => {
        this.availableOrganizations = organizations;
        if (this.availableOrganizations?.length) {
          this.isNoOrganization = false;
        } else {
          this.isNoOrganization = true;
        }

        this._changeDetectorRef.markForCheck();
      },
      error: (error) => {
        this._toastrService.showInfo('APP.SWITCH_ORGANIZATIONS_LOAD_FAILED');
        this.isNoOrganization = true;
        this._changeDetectorRef.markForCheck();
      },
    });
  }

  /**
   * Subscribes to userOrganizations subject, for the goal to update switch orgs
   * everytime the _adminOrganizationsService.getAllUserOrganizations is called in entire application
   */
  private async initUserOrganizations(userId: number) {
    this.availableOrganizations = await lastValueFrom(this._adminOrganizationsService.getAllUserOrganizations(userId));
    if (this.availableOrganizations?.length) {
      const orgId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
      const organizationExist = this.availableOrganizations.find(({ id }) => id === orgId);
      if (organizationExist) {
        this.setActiveOrganization(organizationExist);
      }
      this.isNoOrganization = false;
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * Checks if user id exists, the returns it.
   *
   * @returns number
   */
  private checkIfUserExists(): number {
    const userId = Number(localStorage.getItem(constants.CURRENT_USER_ID));
    if (!userId) {
      this.isNoOrganization = true;
      return userId;
    }
    return 0; // false
  }
}
