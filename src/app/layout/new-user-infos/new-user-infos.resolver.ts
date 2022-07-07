import { lastValueFrom, map } from 'rxjs';

import { ApiService } from 'generated/services';
import { CreatedUserDto } from 'generated/models';
import { Injectable } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { Resolve } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { User } from 'app/models/user';
import { constants } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class NewUserInfosResolver implements Resolve<any> {
  constructor(private _keycloackService: KeycloakService, private _apiService: ApiService, private _toastr: ToastrService) {}

  resolve(): Promise<KeycloakProfile> {
    return this.loadUserProfileKeycloak();
  }

  async loadUserProfileKeycloak() {
    try {
      const user = await this._keycloackService.loadUserProfile();
      localStorage.setItem(constants.KEYCLOAK_USER_ID, user.id);
      return user;
    } catch (error) {
      this._toastr.showError('APP.LOGIN_ERROR_TITLE', 'KEYCLOAK_LOGIN_ERROR');
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      return lastValueFrom(
        this._apiService.userRoutesGetUserByKeycloakId({ kcid: id }).pipe(
          map(({ body }) => {
            localStorage.setItem(constants.CURRENT_USER_ID, `${body.data[0].id}`);
            return new User(body);
          }),
        ),
      );
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  async createUser(user: User): Promise<CreatedUserDto> {
    try {
      return lastValueFrom(this._apiService.userRoutesCreateUser({ body: user }));
    } catch (error) {
      this._toastr.showError('APP.SAVE_NEW_USER_FAILED');
      this._keycloackService.logout();
    }
  }
}
