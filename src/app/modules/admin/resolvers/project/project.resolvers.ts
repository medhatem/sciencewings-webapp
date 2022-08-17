import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectResolver implements Resolve<any> {
  constructor(private _projectService: ProjectService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    await lastValueFrom(this._projectService.getOrgProjectById());
    await lastValueFrom(this._projectService.getAndParseOrganizationProject());
    return lastValueFrom(this._projectService.getAndParseProjectParticipants());
  }
}
