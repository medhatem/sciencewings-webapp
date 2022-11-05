import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupService } from './groups.service';
import { constants } from 'app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class GroupResolver implements Resolve<any> {
  constructor(private _groupService: GroupService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const organizationId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    return this._groupService.getAndParseOrganizationGroups();
  }
}
