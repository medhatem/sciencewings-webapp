import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AdminOrganizationsService } from './admin-organization.service';
import { AdminOrganizationsCategory } from './admin-organization.types';

@Injectable({
  providedIn: 'root',
})
export class AdminOrganizationResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _myOrganizationsService: AdminOrganizationsService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdminOrganizationsCategory[]> {
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
  constructor(private _myOrganizationsService: AdminOrganizationsService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdminOrganizationsCategory[]> {
    return this._myOrganizationsService.getOrganizations();
  }
}

@Injectable({
  providedIn: 'root',
})
export class OrganizationFormResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _router: Router, private _myOrganizationsService: AdminOrganizationsService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdminOrganizationsCategory> {
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
