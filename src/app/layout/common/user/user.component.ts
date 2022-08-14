import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { ToastrService } from 'app/core/toastr/toastr.service';
import { BooleanInput } from '@angular/cdk/coercion';
import { KeycloakService } from 'keycloak-angular';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { constants } from 'app/shared/constants';
import { SharedHelpers } from 'app/shared/helpers';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'user',
})
export class UserComponent implements OnInit, OnDestroy {
  static ngAcceptInputTypeshowAvatar: BooleanInput;
  @Input() showAvatar: boolean = true;
  readonly fullUserProfilePath = [
    '/',
    constants.MODULES_ROUTINGS_URLS.LANDING_PAGE,
    constants.MODULES_ROUTINGS_CHILDREN_URLS.USER.USER_PROFILE,
  ];
  user: User;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _keycloackService: KeycloakService,
    private _toastrService: ToastrService,
    private _sharedHelpers: SharedHelpers,
  ) {}

  ngOnInit(): void {
    const { userKeycloackData } = this._route.snapshot.data;
    this.user = {
      ...userKeycloackData,
      avatar: 'assets/images/avatars/brian-hughes.jpg',
      status: 'online',
    };
    this._changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
   * Update the user status
   *
   * @param status
   */
  updateUserStatus(status: string): void {
    // Return if user is not available
    if (!this.user) {
      return;
    }
  }

  /**
   * Sign out using keycloack
   */
  async signOut() {
    try {
      localStorage.clear();
      await this._keycloackService.logout();
    } catch (error) {
      this._toastrService.showError(constants.KEYCLOAK_LOGOUT_ERROR);
    }
  }
}
