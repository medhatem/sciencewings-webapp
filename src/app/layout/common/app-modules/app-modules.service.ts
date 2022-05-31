import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { AppModule } from './app-modules.types';

@Injectable({
  providedIn: 'root',
})
export class AppModulesService {
  private _appModules: ReplaySubject<AppModule[]> = new ReplaySubject<AppModule[]>(1);

  constructor(private _httpClient: HttpClient) {}

  get appModules$(): Observable<AppModule[]> {
    return this._appModules.asObservable();
  }

  getAll(): Observable<AppModule[]> {
    return this._httpClient.get<AppModule[]>('api/common/shortcuts').pipe(
      tap((appModules) => {
        this._appModules.next(appModules);
      }),
    );
  }
}
