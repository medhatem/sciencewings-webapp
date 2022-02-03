import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EnvService } from 'app/environment/env.service';
import { constants } from 'app/shared/constants';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HasRoleGuard implements CanActivate {
  constructor(private _keycloackService: KeycloakService, private envService: EnvService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const { role = `${constants.DEFAULT_CLIENT_ROLES}-${this.envService.sciencewingsWebRealm}` } = route.data;
    return this._keycloackService.isUserInRole(role);
  }
}
