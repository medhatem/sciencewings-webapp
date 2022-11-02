import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectResolver {}
