import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root',
})
export class ResourceResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _profileService: ResourceService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._profileService.getData();
  }
}
