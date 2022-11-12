import { lastValueFrom, map } from 'rxjs';
import { ApiService } from 'generated/services';
import { Injectable } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { Resolve } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { User, UserRequestObject } from 'app/models/user';
import { constants } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class NewUserInfosResolver implements Resolve<any> {
  constructor(private _keycloackService: KeycloakService, private _apiService: ApiService, private _toastr: ToastrService) {}

  resolve(): Promise<KeycloakProfile> {
    return this.getCurrentUserFromKeycloak();
  }

  async getCurrentUserFromKeycloak() {
    try {
      const userKeycloack = await this._keycloackService.loadUserProfile();
      localStorage.setItem(constants.CURRENT_USER_KEYCLOAK_ID, userKeycloack.id);
      return userKeycloack;
    } catch (error) {
      this._toastr.showError('APP.LOGIN_ERROR_TITLE', 'KEYCLOAK_LOGIN_ERROR');
    }
  }

  async getUser(id: string): Promise<User> {
    return lastValueFrom(this._apiService.userRoutesGetUserByKeycloakId({ kcid: id }).pipe(map(({ body }) => new User(body.data[0]))));
  }

  async createUser(user: UserRequestObject): Promise<User> {
    try {
      return lastValueFrom(this._apiService.userRoutesCreateUser({ body: user }).pipe(map(({ body }) => new User(body))));
    } catch (error) {
      this._toastr.showError('APP.SAVE_NEW_USER_FAILED');
      this._keycloackService.logout();
    }
  }
}
