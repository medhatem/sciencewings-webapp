import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _groups: BehaviorSubject<any | null> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) {}
  get pagination$(): Observable<any> {
    return this._pagination.asObservable();
  }
  get groups$(): Observable<any> {
    return this._groups.asObservable();
  }
  getGroups(
    page: number = 0,
    size: number = 10,
    sort: string = 'name',
    order: 'asc' | 'desc' | '' = 'asc',
    search: string = '',
  ): Observable<{ pagination: any; groups: any[] }> {
    return this._httpClient
      .get<{ pagination: any; groups: any[] }>('api/apps/ecommerce/inventory/products', {
        params: {
          page: '' + page,
          size: '' + size,
          sort,
          order,
          search,
        },
      })
      .pipe(
        tap((response) => {
          this._pagination.next(response.pagination);
          this._groups.next(response.groups);
        }),
      );
  }
}
