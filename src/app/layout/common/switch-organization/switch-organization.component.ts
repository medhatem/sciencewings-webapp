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

  async ngOnInit() {
    /**
     * loops on the get current user id, until it is available. then subscibes
     * to userOrganizations one the user is selected and available is localStorage
     */
    interval(1000)
      .pipe(
        map(async () => {
          const userId = localStorage.getItem(constants.CURRENT_USER_ID);
          if (!Number(userId)) {
            throw new Error('No user selected');
          }
          this._userSelected.next(true);
          this._userSelected.complete();
          await this.subscribeToUserOrganizations();
          return userId;
        }),
        retryWhen((error) => error.pipe(tap())),
        takeUntil(this._userSelected),
      )
      .subscribe({
        next: (val) => val,
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

  setActiveOrganization(organization: UserOrganizations): void {
    this.activeOrganization = organization;
    localStorage.setItem(constants.CURRENT_ORGANIZATION_ID, `${organization.id}`);
    this.onActiveOrganizationChange.emit(this.activeOrganization.id);
  }

  /**
   * Subscribes to userOrganizations subject, for the goal to update switch orgs
   * everytime the _adminOrganizationsService.getAllUserOrganizations is called in entire application
   *
   * @returns
   */
  private async subscribeToUserOrganizations() {
    const userId = localStorage.getItem(constants.CURRENT_USER_ID);
    if (!Number(userId)) {
      this.isNoOrganization = true;
      return;
    }

    this.availableOrganizations = await lastValueFrom(this._adminOrganizationsService.getAllUserOrganizations(Number(userId)));
    if (this.availableOrganizations?.length) {
      this.isNoOrganization = false;
      this._changeDetectorRef.markForCheck();
    }

    this._adminOrganizationsService.userOrganiztions.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (organizations) => {
        this.availableOrganizations = organizations;
        this._changeDetectorRef.markForCheck();
      },
      error: (error) => {
        this._toastrService.showInfo('APP.SWITCH_ORGANIZATIONS_LOAD_FAILED');
        this.isNoOrganization = true;
        this._changeDetectorRef.markForCheck();
      },
    });
  }
}
