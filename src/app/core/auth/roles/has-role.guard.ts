import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { constants } from 'app/shared/constants';
import { environment } from 'environments/environment';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HasRoleGuard implements CanActivate {
  constructor(private _keycloackService: KeycloakService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const { role = `${constants.DEFAULT_CLIENT_ROLES}-${environment.sciencewingsWebRealm}` } = route.data;
    return this._keycloackService.isUserInRole(role);
  }
}
