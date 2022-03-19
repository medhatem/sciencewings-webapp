import { Injectable } from '@angular/core';
import { User } from 'app/models/user';
import { ApiService } from 'generated/services';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewUserInfosService {
  constructor(private _swaggerService: ApiService) {}

  getUser(id: string): Promise<User> {
    return lastValueFrom(
      this._swaggerService.UserRoutesGetUserByKeycloakId(id).pipe(
        map((body) =>
        //   if (data.error) {
        //     throw Error(`${error}`);
        //   }
           new User(body)
        ),
      ),
    );
  }
}
