import { Injectable } from '@angular/core';
import { forkJoin, lastValueFrom, map, Observable } from 'rxjs';
import { ApiService } from 'generated/services';
import { UserOrganizations } from 'app/models/organizations/user-organizations';

@Injectable({
  providedIn: 'root',
})
export class SwitchOrganizationsService {
  constructor(private _swaggerService: ApiService) {}

  getAllUserOrganizations(userId: number): Promise<UserOrganizations[]> {
    return lastValueFrom(
      forkJoin([this._swaggerService.OrganizationRoutesGetUserOrganizations(userId)]).pipe(
        map((userOrganizations) =>
          userOrganizations.reduce((acc, { body, error }) => {
            acc.push(new UserOrganizations(body));
            return acc;
          }, [] as UserOrganizations[]),
        ),
      ),
    );
  }
}
