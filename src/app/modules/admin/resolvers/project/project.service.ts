import { BehaviorSubject, Observable, map, take, tap, lastValueFrom } from 'rxjs';
import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProjectDto, ResponsableObjectDto } from 'generated/models';
import { Member } from 'app/models/members/member';
import { constants } from 'app/shared/constants';
import moment from 'moment';
import { Project, ProjectListItem, ProjectListMember } from 'app/models/projects/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _projects: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _projectParticipent: BehaviorSubject<any | null> = new BehaviorSubject(null);

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
  get projectParticipent$(): Observable<any> {
    return this._projectParticipent.asObservable();
  }

  async createProject(project: Project): Promise<CreateProjectDto> {
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

  getOrgProjects(): Observable<any> {
    const id = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    return this._swaggerService.projectRoutesGetOrganizationProjects({ id });
  }

  getOrgProjectsList(): Observable<any> {
    const id = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    return this._swaggerService.projectRoutesGetAllOrganizationProjectsList({ id });
  }

  getAndParseOrganizationProject(): Observable<any[]> {
    return this.getOrgProjectsList().pipe(
      map((projects) => projects.body.data.map((project) => new ProjectListItem(project))),
      map((projects: ProjectListItem[]) =>
        projects.map(({ creatingDate, members, responsable, title }) => ({
          title: `${title}`,
          managers: this.parseProjectResponsible(responsable),
          participents: `${members}`,
          creatingDate: moment(creatingDate).format(constants.DATE_FORMAT_YYYY_MM_DD),
        })),
      ),
      tap((response) => {
        this._projects.next(response);
      }),
    );
  }
  parseProjectResponsible(responsable: ResponsableObjectDto): string {
    return `<div>${responsable.name}</div><div>${responsable.email}</div>`;
  }
  getOrgProjectMembers(): Observable<any> {
    return this._swaggerService.projectRoutesGetAllProjectParticipants({ id: 1 });
  }
  getAndParseProjectParticipants(): Observable<any[]> {
    return this.getOrgProjectMembers().pipe(
      map((projects) => projects.body.data.map((project) => new ProjectListMember(project))),
      map((projects: ProjectListMember[]) =>
        projects.map(({ member, role, status }) => ({
          member: `${member}`,
          role: `${role}`,
          status: `${status}`,
        })),
      ),
      tap((response) => {
        this._projectParticipent.next(response);
      }),
    );
  }
}
