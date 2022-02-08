import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { NewUserInfosService } from './new-user-infos.service';

@Injectable({
  providedIn: 'root',
})
export class NewUserInfosResolver implements Resolve<any> {
  constructor(private _newUserInfosService: NewUserInfosService, private _keycloackService: KeycloakService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = await this.getloadUserProfileKeycloak();
    return this._newUserInfosService.getUser(Number(id));
  }

  async getloadUserProfileKeycloak() {
    const user = await this._keycloackService.loadUserProfile();
    return user;
  }
}
