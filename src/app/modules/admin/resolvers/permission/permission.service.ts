import { BehaviorSubject, Observable, map, take, tap, lastValueFrom } from 'rxjs';

import { ApiService } from 'generated/services';
import { Injectable } from '@angular/core';
import { Permission } from 'app/models/permissions/permission';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private swaggerAPI: ApiService) {}

  get data$(): Observable<any> {
    return this._data.asObservable();
  }

  getPermissions(): Promise<Permission[]> {
    return lastValueFrom(
      this.swaggerAPI.permissionRoutesGetAllPermissions().pipe(map(({ body }) => body.data.map((permission) => new Permission(permission)))),
    );
  }
}
