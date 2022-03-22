import { Injectable } from '@angular/core';
import { User } from 'app/models/user';
import { CreatedUserDto } from 'generated/models';
import { ApiService } from 'generated/services';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewUserInfosService {
  constructor(private _swaggerService: ApiService) {}

  getUser(id: string): Promise<User> {
    return lastValueFrom(
      this._swaggerService.userRoutesGetUserByKeycloakId({ kcid: id }).pipe(
        map(({ body, error }) => {
          if (error) {
            throw Error(`${error}`);
          }
          // Check with UserBaseBodyGetDTO
          return new User((body as any).user);
        }),
      ),
    );
  }

  createUser(user: User): Observable<CreatedUserDto> {
    return this._swaggerService.userRoutesCreateUser({ body: user });
  }
}
