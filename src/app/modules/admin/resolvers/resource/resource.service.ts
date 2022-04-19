import { BehaviorSubject, Observable, map, take } from 'rxjs';

import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceRo } from 'generated/models';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
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
    return this._httpClient.get('api/apps/resources/all').pipe(
      take(1),
      map((contacts: any) => contacts.find((res) => res.id === 'cd5fa417-b667-482d-b208-798d9da3213c') || null),
    );
  }

  getOrgMembers(id?: string): Observable<any> {
    // this.swaggerAPI.ResourceRoutesGetOgranizationResources(1).subscribe((data) => console.log({ x:data }));
    return this._httpClient.get('http://localhost:3000/organization/getMembers/1');
  }
  getOrgResource(id?: string): Observable<any> {
    // this.swaggerAPI.ResourceRoutesGetOgranizationResources(1).subscribe((data) => console.log({ x:data }));
    return this._httpClient.get('http://localhost:3000/organization/resources/getOgranizationResourcesById/1');
  }
  createResource(payload: ResourceRo) {
    return this._httpClient.post('http://localhost:3000/organization/resources/create', payload);
  }
  updateResource(id: number, payload: ResourceRo) {
    return this._httpClient.put('http://localhost:3000/organization/resources/update/' + id, payload);
  }
  getResource(id?: number): Observable<any> {
    // this.swaggerAPI.ResourceRoutesGetOgranizationResources(1).subscribe((data) => console.log({ x:data }));
    return this._httpClient.get('http://localhost:3000/resources/getById/' + id);
  }
  deleteResource(id?: number): Observable<any> {
    // this.swaggerAPI.ResourceRoutesGetOgranizationResources(1).subscribe((data) => console.log({ x:data }));
    return this._httpClient.delete('http://localhost:3000/resources/' + id);
  }
}
