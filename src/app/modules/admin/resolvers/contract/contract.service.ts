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

  get projects$(): Observable<any> {
    return this._projects.asObservable();
  }

  async createContract(contract: ContractRo): Promise<ContracBaseDto> {
    return lastValueFrom(this._swaggerService.contractRoutesCreateContract({ body: contract as any }));
  }

  getMemberContracts(): Observable<any> {
    const orgId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    const userId = 1;
    return this._swaggerService.contractRoutesGetAllMemberContracts({ orgId, userId });
  }
}
