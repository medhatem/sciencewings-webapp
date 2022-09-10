import { BehaviorSubject, Observable } from 'rxjs';

import { ApiService } from 'generated/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private _resources: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient, private swaggerAPI: ApiService) {}

  /**
   * Getter for data
   * k
   */
  get data$(): Observable<any> {
    return this._data.asObservable();
  }
  get pagination$(): Observable<any> {
    return this._pagination.asObservable();
  }

  get resources$(): Observable<any> {
    return this._resources.asObservable();
  }

  getReservations(resourceId: number, start: string, end: string): Observable<any> {
    return this.swaggerAPI.reservationRoutesGetEventsByRange({ resourceId, start, end });
  }
}
