import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { ToastrService } from 'app/core/toastr/toastr.service';
import { BooleanInput } from '@angular/cdk/coercion';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { constants } from 'app/shared/constants';

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
  user: User;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _keycloackService: KeycloakService,
    private _toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.user = {
      id: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
      name: 'Brian Hughes',
      email: 'hughes.brian@company.com',
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
      await this._keycloackService.logout();
    } catch (error) {
      this._toastrService.showError(error, constants.KEYCLOAK_LOGOUT_ERROR);
    }
  }
}
