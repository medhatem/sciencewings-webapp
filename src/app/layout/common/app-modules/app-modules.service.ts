import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { AppModule } from './app-modules.types';

@Injectable({
  providedIn: 'root',
})
export class AppModulesService {
  constructor(private _httpClient: HttpClient) {}

  getAll(): Observable<AppModule[]> {
    return this._httpClient.get<AppModule[]>('api/common/shortcuts');
  }
}
