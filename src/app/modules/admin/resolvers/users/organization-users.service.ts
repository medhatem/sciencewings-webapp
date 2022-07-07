import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationUsersService {
  constructor(private _httpClient: HttpClient) {}

  getData(id?: string): Promise<any> {
    return lastValueFrom(this._httpClient.get('api/apps/organization-users/users'));
  }
}
