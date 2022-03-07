import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { Observable, from } from 'rxjs';
import { constants } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class NewUserInfosResolver implements Resolve<any> {
  constructor(private _keycloackService: KeycloakService, private _toastr: ToastrService) {}

  resolve(): Observable<any> {
    return from(this.getloadUserProfileKeycloak());
  }

  async getloadUserProfileKeycloak() {
    this._keycloackService
      .loadUserProfile()
      .then((user) => {
        localStorage.setItem(constants.KEYCLOAK_USER_ID, user.id);
      })
      .catch((error) => {
        this._toastr.showError('APP.LOGIN_ERROR_TITLE', 'KEYCLOAK_LOGIN_ERROR');
      });

    return await this._keycloackService.loadUserProfile();
  }
}
