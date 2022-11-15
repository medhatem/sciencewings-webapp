import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionResolver implements Resolve<any> {
  constructor(private _permissionService: PermissionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._permissionService.getPermissions();
  }
}
