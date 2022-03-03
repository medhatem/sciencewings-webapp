import { BehaviorSubject, Observable, map, take } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ResourceService {
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

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
    return this._httpClient.get('api/apps/resources/all').pipe(
      take(1),
      map((contacts: any) => contacts.find(res => res.id === 'cd5fa417-b667-482d-b208-798d9da3213c') || null)
    );
  }

}
