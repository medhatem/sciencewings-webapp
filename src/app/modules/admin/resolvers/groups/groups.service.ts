import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {} from 'generated/models';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _groups: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient, private swaggerAPI: ApiService) {}

  get data$(): Observable<any> {
    return this._data.asObservable();
  }

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
      .get<{ pagination: any; groups: any[] }>('api/apps/ecommerce/inventory/groups', {
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
