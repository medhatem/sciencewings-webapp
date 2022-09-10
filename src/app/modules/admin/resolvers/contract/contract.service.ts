import { BehaviorSubject, Observable, map, take, tap, lastValueFrom } from 'rxjs';
import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContracBaseDto, CreateProjectDto, UpdateContractRo } from 'generated/models';
import { Member } from 'app/models/members/member';
import { constants } from 'app/shared/constants';
import moment from 'moment';
import { Project, ProjectListItem } from 'app/models/projects/project';
import { ContractRo, GetContract } from 'app/models/contract/contract';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _contracts: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient, private _swaggerService: ApiService) {}

  get data$(): Observable<any> {
    return this._data.asObservable();
  }

  get pagination$(): Observable<any> {
    return this._pagination.asObservable();
  }

  get contracts$(): Observable<any> {
    return this._contracts.asObservable();
  }

  async createContract(project: ContractRo): Promise<ContracBaseDto> {
    return lastValueFrom(this._swaggerService.contractRoutesCreateContract({ body: project as any }));
  }

  getMemberContracts(orgId: number, userId: number): Observable<any> {
    return this._swaggerService.contractRoutesGetAllMemberContracts({ orgId, userId });
  }

  getAndParseMemberContracts(orgId: number, userId: number): Observable<any[]> {
    return this.getMemberContracts(orgId, userId).pipe(
      map((contracts) => contracts.body.data.map((contract) => new GetContract(contract))),
      map((projects: GetContract[]) =>
        projects.map((contract) => ({
          contractDto: contract,
          name: `${contract.job.name}`,
          supervisor: `${contract.supervisor.name}`,
          jobLevel: contract.jobLevel,
          dateStart: moment(contract.dateStart).format(constants.DATE_FORMAT_YYYY_MM_DD),
        })),
      ),
      tap((response) => {
        this._contracts.next(response);
      }),
    );
  }
}
