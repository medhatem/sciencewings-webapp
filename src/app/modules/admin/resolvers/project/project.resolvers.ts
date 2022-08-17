import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectResolver implements Resolve<any> {
  constructor(private _projectService: ProjectService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {}
}
