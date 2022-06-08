import { BehaviorSubject, Observable, map, take } from 'rxjs';

import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {} from 'generated/models';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient, private swaggerAPI: ApiService) {}

  /**
   * Getter for data
   * k
   */
  get data$(): Observable<any> {
    return this._data.asObservable();
  }

  /**
   * Get data
   */
  getData(id?: string): Observable<any> {
    return this._httpClient.get('api/apps/groups/all').pipe(
      take(1),
      map((contacts: any) => contacts.find((group) => group.id === 'cd5fa417-b667-482d-b208-798d9da3213c') || null),
    );
  }
}
