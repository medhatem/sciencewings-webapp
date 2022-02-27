import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminOrganizationsService } from './admin-organization.service';
import { AdminOrganizationsCategory } from './admin-organization.types';

@Injectable({
  providedIn: 'root',
})
export class AdminOrganizationResolver implements Resolve<any> {
  constructor(private _myOrganizationsService: AdminOrganizationsService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdminOrganizationsCategory[]> {
    return this._myOrganizationsService.getCategories();
  }
}
