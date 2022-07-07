import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private _httpClient: HttpClient) {}

  async getData(id?: string): Promise<any> {
    // Using fuse's mock api to retrieve an assumed current user
    //TODO: Use back-end services when ready

    return lastValueFrom(
      this._httpClient.get('api/apps/contacts/all').pipe(
        take(1),
        map((contacts: any) => contacts.find((res) => res.id === 'cd5fa417-b667-482d-b208-798d9da3213c') || null),
      ),
    );
  }
}
