import { lastValueFrom, map } from 'rxjs';

import { ApiService } from 'generated/services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrganizationMemberService {
  constructor(private _swaggerService: ApiService) {}

  getAllMembersForOrganization(): any[] {
    return [{ name: 'group 1', status: 'active', members: 3, date: '2020/09/08' }];
  }
}
