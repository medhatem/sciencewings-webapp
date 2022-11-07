import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractService } from './contract.service';
import { constants } from 'app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ContractResolver implements Resolve<any> {
  constructor(private _contractService: ContractService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const orgId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    const userId = Number(localStorage.getItem(constants.CURRENT_USER_ID));

    return this._contractService.getAndParseMemberContracts(orgId, userId);
  }
}
