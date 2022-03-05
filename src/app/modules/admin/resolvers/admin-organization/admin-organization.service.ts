import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { Course, AdminOrganizationsCategory } from './admin-organization.types';
import { ApiService } from 'generated/services';
import { CreateOrganizationRO } from 'generated/models/create-organization-ro';
import { Organization } from 'app/models/organizations/organization';

@Injectable({
  providedIn: 'root',
})
export class AdminOrganizationsService {
  // Private
  private _organizationTypes: BehaviorSubject<AdminOrganizationsCategory[] | null> = new BehaviorSubject(null);
  private _organization: BehaviorSubject<CreateOrganizationRO | null> = new BehaviorSubject(null);
  private _organizations: BehaviorSubject<CreateOrganizationRO[] | null> = new BehaviorSubject(null);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient, private _swaggerService: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for categories
   */
  get organizationTypes$(): Observable<AdminOrganizationsCategory[]> {
    return this._organizationTypes.asObservable();
  }

  /**
   * Getter for organizations
   */
  get organizations$(): Observable<any> {
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
  getCategories(): Observable<AdminOrganizationsCategory[]> {
    return this._httpClient.get<AdminOrganizationsCategory[]>('api/apps/organizations/organizations-categories').pipe(
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
  getOrganization(id: string | number): Observable<CreateOrganizationRO> {
    return this._swaggerService.OrganizationRoutesGetById(Number(id)).pipe(
      map((organization) => {
        // Update the organization
        this._organization.next(organization);
        // Return the organization
        return organization;
      }),
      switchMap((organization) => {
        if (!organization) {
          throw Error('Could not found organization with id of ' + id + '!');
        }
        return of(organization);
      }),
    );
  }

  createOrganization(organization: Organization): Observable<Organization> {
    return this._swaggerService.OrganizationRoutesCreateOrganization(organization).pipe(map(({ body }) => new Organization(body)));
  }
}
