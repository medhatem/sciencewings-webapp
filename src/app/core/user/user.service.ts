import { Observable, ReplaySubject, map } from 'rxjs';

import { ApiService } from 'generated/services/api.service';
import { BaseRequestDto } from 'generated/models/base-request-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/core/user/user.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private _httpClient: HttpClient, private _apiService: ApiService) {}

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
   * Get the current logged in user by id
   */
  get(id: number): Observable<BaseRequestDto> {
    return this._apiService.userRoutesGetById({ id });
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
