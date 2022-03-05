import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { NewUserInfosService } from './new-user-infos.service';
import { ToastrService } from 'app/core/toastr/toastr.service';

import { Observable } from 'rxjs';
import { from } from 'rxjs';

import { constants } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class NewUserInfosResolver implements Resolve<any> {
  constructor(private _newUserInfosService: NewUserInfosService, private _keycloackService: KeycloakService, private _toastr: ToastrService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return from(this.getloadUserProfileKeycloak());
  }

  async getloadUserProfileKeycloak() {
    this._keycloackService
      .loadUserProfile()
      .then((user) => {
        localStorage.setItem(constants.KEYCLOAK_USER_ID, user.id);
      })
      .catch((error) => {
        this._toastr.showError('An error occured while trying to get the kcid', 'Keycloak service');
      });

    return await this._keycloackService.loadUserProfile();
  }
}
