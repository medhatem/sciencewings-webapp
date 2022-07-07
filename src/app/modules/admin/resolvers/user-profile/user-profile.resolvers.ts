import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileResolver implements Resolve<any> {
  constructor(private _profileService: UserProfileService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this._profileService.getData();
  }
}
