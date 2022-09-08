import { BehaviorSubject, Observable, map, take, tap, lastValueFrom } from 'rxjs';
import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContracBaseDto, CreateProjectDto } from 'generated/models';
import { Member } from 'app/models/members/member';
import { constants } from 'app/shared/constants';
import moment from 'moment';
import { Project, ProjectListItem } from 'app/models/projects/project';
import { ContractRo } from 'app/models/contract/contract';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
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

  get contracts$(): Observable<any> {
    return this._projects.asObservable();
  }

  async createContract(project: ContractRo): Promise<ContracBaseDto> {
    return lastValueFrom(this._swaggerService.contractRoutesCreateContract({ body: project as any }));
  }

  getMemberContracts(orgId: number, userId: number): Observable<any> {
    return this._swaggerService.contractRoutesGetAllMemberContracts({ orgId, userId });
  }

  getAndParseMemberContracts(orgId: number, userId: number): Observable<any[]> {
    return this.getMemberContracts(orgId, userId).pipe(
      map((contracts) => contracts.body.data.map((contract) => new ContractRo(contract))),
      map((projects: ContractRo[]) =>
        projects.map(({ name, supervisor, jobLevel, dateStart }) => ({
          name: `${name}`,
          supervisor: supervisor,
          jobLevel: jobLevel,
          dateStart: moment(dateStart).format(constants.DATE_FORMAT_YYYY_MM_DD),
        })),
      ),
      tap((response) => {
        this._projects.next(response);
      }),
    );
  }
  private parseMembersToHtml(members: Member[]) {
    return members.map(({ name, workEmail }) => `<div>${name}</div><div>${workEmail}</div>`);
  }
}
