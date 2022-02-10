import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ApiService } from 'generated/services';

@Injectable({
  providedIn: 'root',
})
export class SwitchOrganizationsService {
  private _availableOrganizations: ReplaySubject<[]> = new ReplaySubject<[]>(1);

  /**
   * Constructor
   */
  constructor(private _swaggerService: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for shortcuts
   */
  get availableOrganizations$(): Observable<[]> {
    return this._availableOrganizations.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get all messages
   */
  getAllAvailableOrganizationsForUser(userId: number): Observable<[]> {
    // To do: get organizations by user id
    // ASK BACKEND TO ADD USERID TO ROUTE
    return this._swaggerService.OrganizationRoutesGetAll();
  }
}
