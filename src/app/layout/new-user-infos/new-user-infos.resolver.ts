import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from '../../shared/constants';
import { KeycloakProfile } from 'keycloak-js';
import { User } from 'app/models/user';
import { ApiService } from 'generated/services';
import { lastValueFrom, map } from 'rxjs';
import { CreatedUserDto } from 'generated/models';

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
    return lastValueFrom(
      this._apiService.userRoutesGetUserByKeycloakId({ kcid: id }).pipe(
        map(({ body, error }) => {
          if (error) {
            throw Error(`${error}`);
          }
          return new User(body);
        }),
      ),
    );
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
