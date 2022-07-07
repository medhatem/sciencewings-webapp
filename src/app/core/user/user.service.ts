import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private _httpClient: HttpClient) {}

  /**
   * Setter & getter for user
   *
   * @param value
   */
  get user$(): Observable<User> {
    return this._user.asObservable();
  }
  set user(value: User) {
    // Store the value
    this._user.next(value);
  }

  /**
   * Get the current logged in user data
   */
  get(): Observable<User> {
    //TODO
    // implement keycloak and api
    return new Observable<User>();
  }

  /**
   * Update the user
   *
   * @param user
   */
  update(user: User): Observable<any> {
    return this._httpClient.patch<User>('api/common/user', { user }).pipe(
      map((response) => {
        this._user.next(response);
      }),
    );
  }
}
