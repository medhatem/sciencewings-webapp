import { Observable, ReplaySubject, map, lastValueFrom } from 'rxjs';

import { ApiService } from 'generated/services/api.service';
import { BaseRequestDto } from 'generated/models/base-request-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { ChangeUserLanguageDto } from 'generated/models/change-user-language-dto';
import { UserGetDto } from 'generated/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private _httpClient: HttpClient, private swaggerAPI: ApiService) {}

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
    return this.swaggerAPI.userRoutesGetById({ id });
  }

  getUserByKeycloak(id: number): Observable<UserGetDto> {
    return this.swaggerAPI.userRoutesGetUserByKeycloakId({ id });
  }

  async updateUserLanguage(language: string): Promise<ChangeUserLanguageDto> {
    return lastValueFrom(this.swaggerAPI.userRoutesChangeUserLanguage({ language }));
  }

  delete(id: number) {
    return this.swaggerAPI.reservationRoutesRemove({ id });
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
