import { BehaviorSubject, Observable, map, take, tap, lastValueFrom } from 'rxjs';
import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectDto } from 'generated/models';
import { OrganizationMembers } from 'app/models/members/member';
import { Project } from 'app/models/project';
import { constants } from 'app/shared/constants';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _projects: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient, private _swaggerService: ApiService) {}

  get data$(): Observable<any> {
    return this._data.asObservable();
  }

  get pagination$(): Observable<any> {
    return this._pagination.asObservable();
  }

  get projects$(): Observable<any> {
    return this._projects.asObservable();
  }

  async getMembers(id?: number): Promise<OrganizationMembers[]> {
    return lastValueFrom(
      this._swaggerService
        .organizationRoutesGetUsers({ id })
        .pipe(map(({ body }) => body.data.map((member) => new OrganizationMembers(member)))),
    );
  }
  async createProject(project: Project): Promise<ProjectDto> {
    return lastValueFrom(this._swaggerService.projectRoutesCreateProject({ body: project as any }));
  }
  getProjectsAll(
    page: number = 0,
    size: number = 10,
    sort: string = 'name',
    order: 'asc' | 'desc' | '' = 'asc',
    search: string = '',
  ): Observable<{ pagination: any; projects: any[] }> {
    return this._httpClient
      .get<{ pagination: any; projects: any[] }>('api/apps/dashboard/projects', {
        params: {
          page: '' + page,
          size: '' + size,
          sort,
          order,
          search,
        },
      })
      .pipe(
        tap((response) => {
          this._pagination.next(response.pagination);
          this._projects.next(response.projects);
        }),
      );
  }
  getMember(id: number): Observable<any> {
    return this._swaggerService.memberRoutesGetById({ id });
  }

  getOrgProjects(): Observable<any> {
    const id = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    return this._swaggerService.projectRoutesGetAllProjects({ id });
  }

  getAndParseOrganizationProject(): Observable<any[]> {
    return this.getOrgProjects().pipe(
      map((projects) => projects.body.data.map((project) => new Project(project))),
      map((result: Project[]) =>
        result.map((m: Project): any => ({
          title: `${m.title}`,
          managers: `${this.getMember(1).subscribe((member) => member.name)}`,
          dateStart: moment(m.dateStart).format(constants.DATE_FORMAT_YYYY_MM_DD),
          active: `${m.active}`,
        })),
      ),
      tap((response) => {
        this._projects.next(response);
      }),
    );
  }
}
