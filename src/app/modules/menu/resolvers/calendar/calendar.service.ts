import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuCalendarService {
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
    return this._httpClient.get('api/dashboard/profile').pipe(
      tap((response: any) => {
        this._data.next(response);
      }),
    );
  }
}
