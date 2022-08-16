import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { InfrastructureService } from './infrastructure.service';

@Injectable({
  providedIn: 'root',
})
export class InfrastructureResolver implements Resolve<any> {
  constructor(private _infrasructureService: InfrastructureService) {}
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return await lastValueFrom(this._infrasructureService.getAndParseOrganizationInfrastructures());
  }
}
