import { BehaviorSubject, Observable, map, tap, lastValueFrom } from 'rxjs';
import { ApiService } from 'generated/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContracBaseDto, UpdateContractRo } from 'generated/models';
import { constants } from 'app/shared/constants';
import moment from 'moment';
import { ContractRo, GetContract } from 'app/models/contract/contract';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _contracts: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _contractsPaginated: BehaviorSubject<any | null> = new BehaviorSubject(null);

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

  get contractsPaginated$(): Observable<any> {
    return this._contractsPaginated.asObservable();
  }

  async createContract(contract: ContractRo): Promise<ContracBaseDto> {
    return lastValueFrom(this._swaggerService.contractRoutesCreateContract({ body: contract as any }));
  }

  async updateContract(id: number, body: UpdateContractRo): Promise<ContracBaseDto> {
    return lastValueFrom(this._swaggerService.contractRoutesCreateUpdateContract({ id, body }));
  }

  getMemberContracts(orgId: number, userId: number, page?: number, size?: number): Observable<any> {
    if (page | size) {
      return this._swaggerService.contractRoutesGetAllMemberContracts({ orgId, userId, page, size });
    } else {
      return this._swaggerService.contractRoutesGetAllMemberContracts({ orgId, userId });
    }
  }

  getAndParseMemberContracts(orgId?: number, userId?: number, page: number = 0, size: number = 5) {
    page = page * 1;
    size = size * 1;
    orgId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    userId = Number(localStorage.getItem(constants.CURRENT_USER_ID));
    return this.getMemberContracts(orgId, userId, page, size).pipe(
      map((result) => {
        const contracts = result.body.data
          .map((infrastructure) => new GetContract(infrastructure))
          .map((contract: GetContract) => ({
            contractDto: contract,
            name: `${contract.job.name}`,
            supervisor: `${contract?.supervisor?.name || ''}`,
            jobLevel: `${contract?.jobLevel || ''}`,
            dateStart: moment(contract.dateStart).format(constants.DATE_FORMAT_YYYY_MM_DD),
          }));
        return { contracts, pagination: result.body.pagination };
      }),
      tap((response) => {
        this._contractsPaginated.next(response.contracts);
        this._pagination.next(response.pagination);
      }),
    );
  }
}
