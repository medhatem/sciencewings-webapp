import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {}

  /**
   * Getter for data
   */
  get data$(): Observable<any> {
    return this._data.asObservable();
  }

  /**
   * Get data
   */
  getData(id?: string): Observable<any> {
    // Using fuse's mock api to retrieve an assumed current user
    // TODO: Use back-end services when ready

    return this._httpClient.get('api/apps/contacts/all').pipe(
      take(1),
      map((contacts: any) => {          
          return contacts.find(res => res.id === 'cd5fa417-b667-482d-b208-798d9da3213c') || null;
      })
    );
  }
}
