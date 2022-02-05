import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { MyOrganizationsService } from './my-organizations.service';
import { MyOrganizationsCategory } from './my-organizations.types';

@Injectable({
  providedIn: 'root',
})
export class MyOrganizationsResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _myOrganizationsService: MyOrganizationsService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MyOrganizationsCategory[]> {
    return this._myOrganizationsService.getCategories();
  }
}

@Injectable({
  providedIn: 'root',
})
export class MyOrganizationsDetailsResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _myOrganizationsService: MyOrganizationsService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MyOrganizationsCategory[]> {
    return this._myOrganizationsService.getOrganizations();
  }
}

@Injectable({
  providedIn: 'root',
})
export class MyOrganizationsDetailResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _router: Router, private _myOrganizationsService: MyOrganizationsService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MyOrganizationsCategory> {
    return this._myOrganizationsService.getCourseById(route.paramMap.get('id')).pipe(
      // Error here means the requested task is not available
      catchError((error) => {
        // Log the error
        console.error(error);

        // Get the parent url
        const parentUrl = state.url.split('/').slice(0, -1).join('/');

        // Navigate to there
        this._router.navigateByUrl(parentUrl);

        // Throw an error
        return throwError(error);
      }),
    );
  }
}
