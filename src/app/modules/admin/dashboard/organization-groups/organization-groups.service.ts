import { lastValueFrom, map } from 'rxjs';

import { ApiService } from 'generated/services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrganizationGroupService {
  constructor(private _swaggerService: ApiService) {}

  getAllGroupsForOrganization(): any[] {
    return [{ name: 'group 1', status: 'active', members: 3, date: '2020/09/08' }];
  }
}
