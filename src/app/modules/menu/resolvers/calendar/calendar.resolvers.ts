import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuCalendarService } from './calendar.service';

@Injectable({
  providedIn: 'root',
})
export class MenuCalendarResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _profileService: MenuCalendarService) {}

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
