import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LandingPageService } from './landing-page.service';
@Injectable({
  providedIn: 'root',
})
export class LandingPageResolver implements Resolve<any> {
  constructor(private _landingPageService: LandingPageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    const { id } = route.queryParams;
    return this._landingPageService.getData(id);
  }
}
