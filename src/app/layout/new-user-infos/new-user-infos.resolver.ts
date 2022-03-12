import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from '../../shared/constants';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class NewUserInfosResolver implements Resolve<any> {
  constructor(private _keycloackService: KeycloakService, private _toastr: ToastrService) {}

  resolve(): Promise<KeycloakProfile> {
    return this.getloadUserProfileKeycloak();
  }

  async getloadUserProfileKeycloak() {
    try {
      const user = await this._keycloackService.loadUserProfile();
      localStorage.setItem(constants.KEYCLOAK_USER_ID, user.id);
      return user;
    } catch (error) {
      this._toastr.showError('APP.LOGIN_ERROR_TITLE', 'KEYCLOAK_LOGIN_ERROR');
    }
  }
}
