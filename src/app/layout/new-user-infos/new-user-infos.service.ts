import { lastValueFrom, map } from 'rxjs';

import { ApiService } from 'generated/services';
import { Injectable } from '@angular/core';
import { User } from 'app/models/user';

@Injectable({
  providedIn: 'root',
})
export class NewUserInfosService {
  constructor(private _swaggerService: ApiService) {}

  getUser(id: string): Promise<User> {
    return lastValueFrom(
      this._swaggerService.userRoutesGetUserByKeycloakId({kcid:id}).pipe(
        map(({ body, error }) => {
          if (error) {
            throw Error(`${error}`);
          }
          return new User(body);
        }),
      ),
    );
  }
}
