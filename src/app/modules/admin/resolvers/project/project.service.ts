import { BehaviorSubject, Observable, map, take, tap, lastValueFrom } from 'rxjs';
import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProjectDto, MemberDto, UpdateProjectDto, UpdateProjectRo } from 'generated/models';
import { Member } from 'app/models/members/member';
import { constants } from 'app/shared/constants';
import moment from 'moment';
import { Project, ProjectListItem, ProjectListMember } from 'app/models/projects/project';
import { ProjectMember } from 'app/models/projects/project-member';
import { ResponsableObjectDTO } from 'app/models/projects/project-type';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _projects: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _projectParticipent: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _projectsPaginated: BehaviorSubject<any | null> = new BehaviorSubject(null);

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

  get projectsPaginated$(): Observable<any> {
    return this._projectsPaginated.asObservable();
  }

  async createProject(project: Project): Promise<CreateProjectDto> {
    return lastValueFrom(this._swaggerService.projectRoutesCreateProject({ body: project as any }));
  }
  async updateProject(project: UpdateProjectRo, id: number): Promise<UpdateProjectDto> {
    return lastValueFrom(
      this._swaggerService.projectRoutesUpdateProject({
        body: project as any,
        id,
      }),
    );
  }
  async addMemberToProject(id: number, payload: ProjectMember): Promise<CreateProjectDto> {
    return lastValueFrom(this._swaggerService.projectRoutesAddMembersToProject({ id, body: payload as ProjectMember }));
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

  getOrgProjectsList(page?: number, size?: number, query?: string): Observable<any> {
    const id = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    if (page || size || query) {
      return this._swaggerService.projectRoutesGetAllOrganizationProjectsList({ id, page, size, query });
    } else {
      return this._swaggerService.projectRoutesGetAllOrganizationProjectsList({ id });
    }
  }

  getAndParseOrganizationProjects(page: number = 0, size: number = 5, query?: string) {
    return this.getOrgProjectsList(page, size, query || null).pipe(
      map(({ body }) => {
        const { data, pagination } = body;
        const projects = data.map((projectDirty) => {
          const { title, responsable, members, creatingDate, id, projectDto } = new ProjectListItem(projectDirty);
          return {
            title: `${title}`,
            responsable: this.parseProjectResponsible(responsable),
            participents: `${members}`,
            creatingDate: moment(creatingDate).format(constants.DATE_FORMAT_YYYY_MM_DD),
            id: id,
            projectDto: projectDto,
            responsableInformations: responsable,
          };
        });
        return { projects, pagination };
      }),
      tap(({ projects, pagination }) => {
        this._projectsPaginated.next(projects);
        this._pagination.next(pagination);
      }),
    );
  }

  parseProjectResponsible(responsable: ResponsableObjectDTO): string {
    return `<div>${responsable.name}</div><div>${responsable.email}</div>`;
  }

  getOrgProjectById(id: number): Observable<any> {
    return this._swaggerService.projectRoutesGetOrganizationProjectById({ id });
  }

  getOrgProjectMembers(projectId?: number): Observable<any> {
    const id = projectId || Number(localStorage.getItem(constants.CURRENT_PROJECT_ID));
    return this._swaggerService.projectRoutesGetAllProjectParticipants({ id });
  }

  getAndParseProjectParticipants(projectId?: number): Observable<any[]> {
    const id = projectId || Number(localStorage.getItem(constants.CURRENT_PROJECT_ID));
    return this.getOrgProjectMembers(id).pipe(
      map((participants) => participants.body.data.map((participant) => new ProjectListMember(participant))),
      map((participants: ProjectListMember[]) =>
        participants.map(({ member, role, status, createdAt }) => ({
          member: this.parseProjectMembers(member),
          role: `${role}`,
          status: `${status}`,
          createdAt: `${createdAt}`,
        })),
      ),
      tap((response) => {
        this._projectParticipent.next(response);
      }),
    );
  }

  parseProjectMembers(member: MemberDto): string {
    return `<div>${member.name}</div><div>${member.workEmail}</div>`;
  }
}
