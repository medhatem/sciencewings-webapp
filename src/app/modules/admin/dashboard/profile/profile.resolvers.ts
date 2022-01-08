import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from 'app/modules/admin/dashboard/profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _profileService: ProfileService) {}

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
    const { id } = route.queryParams;
    return;
    // To Do
    return this._profileService.getData(id);
  }
}
