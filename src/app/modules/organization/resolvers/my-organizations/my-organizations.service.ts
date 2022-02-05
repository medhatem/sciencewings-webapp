import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Course, MyOrganizationsCategory } from './my-organizations.types';

@Injectable({
  providedIn: 'root',
})
export class MyOrganizationsService {
  // Private
  private _organizationTypes: BehaviorSubject<MyOrganizationsCategory[] | null> = new BehaviorSubject(null);
  private _organization: BehaviorSubject<Course | null> = new BehaviorSubject(null);
  private _organizations: BehaviorSubject<Course[] | null> = new BehaviorSubject(null);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for categories
   */
  get organizationTypes$(): Observable<MyOrganizationsCategory[]> {
    return this._organizationTypes.asObservable();
  }

  /**
   * Getter for organizations
   */
  get organizations$(): Observable<Course[]> {
    return this._organizations.asObservable();
  }

  /**
   * Getter for organization
   */
  get organization$(): Observable<any> {
    return this._organization.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get categories
   */
  getCategories(): Observable<MyOrganizationsCategory[]> {
    return this._httpClient.get<MyOrganizationsCategory[]>('api/apps/organizations/organizations-categories').pipe(
      tap((response: any) => {
        this._organizationTypes.next(response);
      }),
    );
  }

  /**
   * Get organizations
   */
  getOrganizations(): Observable<any[]> {
    return this._httpClient.get<Course[]>('api/apps/organizations/my-organizations').pipe(
      tap((response: any) => {
        this._organizations.next(response);
      }),
    );
  }

  /**
   * Get organization by id
   */
  getCourseById(id: string): Observable<Course> {
    return this._httpClient.get<Course>('api/apps/organizations/organization', { params: { id } }).pipe(
      map((organization) => {
        // Update the organization
        this._organization.next(organization);

        // Return the organization
        return organization;
      }),
      switchMap((organization) => {
        if (!organization) {
          return throwError('Could not found organization with id of ' + id + '!');
        }

        return of(organization);
      }),
    );
  }
}
