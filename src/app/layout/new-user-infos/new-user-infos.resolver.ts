import { ErrorHandler, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { NewUserInfosService } from './new-user-infos.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewUserInfosResolver implements Resolve<any> {
  constructor(private _newUserInfosService: NewUserInfosService, private _keycloackService: KeycloakService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return from(this.getloadUserProfileKeycloak());
  }

  async getloadUserProfileKeycloak() {
    this._keycloackService.loadUserProfile()
      .then(user => {
        localStorage.setItem('kcid', user.id);
      })
      .catch(error => {
        throw error;
      });

    return await this._keycloackService.loadUserProfile();
  }
}
