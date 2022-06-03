import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupService } from './groups.service';

@Injectable({
  providedIn: 'root',
})
export class GroupResolver implements Resolve<any> {
  constructor(private _groupService: GroupService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._groupService.getGroups();
  }
}
