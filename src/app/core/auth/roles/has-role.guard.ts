import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { environment } from 'environments/environment';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

/**
 * //TODO
 * This can be used in the future as a guard to add to routes
 * Check if the current user has a specific role and returns true/false
 * Could add groups checks ... etc etc
 */
@Injectable({ providedIn: 'root' })
export class HasRoleGuard implements CanActivate {
  readonly guestRole: string = 'Guest';
  constructor(private _keycloackService: KeycloakService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const { role = `${this.guestRole}-${environment.sciencewingsWebRealm}` } = route.data;
    return this._keycloackService.isUserInRole(role);
  }
}
