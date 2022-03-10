import { BehaviorSubject, Observable, map, take } from 'rxjs';

import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateResourceRO } from 'generated/models';

@Injectable({
    providedIn: 'root',
})
export class ResourceService {
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient, private swaggerAPI: ApiService) { }

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

    /**
     * Get data
     */
    getOrgResource(id?: string): Observable<any> {
        // this.swaggerAPI.ResourceRoutesGetOgranizationResources(1).subscribe((data) => console.log({ x:data }));
        return this._httpClient.get('http://localhost:3000/resources/getOgranizationResourcesById/1');
    }

    createResource(payload: CreateResourceRO) {
        return this._httpClient.post('http://localhost:3000/resources/create', payload);
    }
    updateResource(id: number, payload: CreateResourceRO) {
        return this._httpClient.put('http://localhost:3000/resources/update/' + id, payload);
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
