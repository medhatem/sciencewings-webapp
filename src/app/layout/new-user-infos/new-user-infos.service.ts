import { Injectable } from '@angular/core';
import { User } from 'app/models';
import { CreatedUserDTO } from 'generated/models';
import { ApiService } from 'generated/services';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewUserInfosService {
  private _newLoggedUser: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private _swaggerService: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for user from DB
   */
  get newLoggedUser$(): Observable<any> {
    return this._newLoggedUser.asObservable();
  }

  getUser(id: string) {
    return this._swaggerService.UserRoutesGetUserByKeycloakId(id).pipe(
      tap((response: any) => {
        this._newLoggedUser.next(response);
      }),
    );
  }

  createUser(user: User): Observable<CreatedUserDTO> {
    return this._swaggerService.UserRoutesCreateUser(user);
  }
}
