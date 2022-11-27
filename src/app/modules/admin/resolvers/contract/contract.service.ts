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

  getMemberContracts(orgId: number, userId: number, page?: number, size?: number, query?: string): Observable<any> {
    if (page || size || query) {
      return this._swaggerService.contractRoutesGetAllMemberContracts({ orgId, userId, page, size, query });
    } else {
      return this._swaggerService.contractRoutesGetAllMemberContracts({ orgId, userId });
    }
  }

  async delete(id?: number): Promise<any> {
    return await lastValueFrom(this._swaggerService.contractRoutesRemove({ id }));
  }

  getAndParseMemberContracts(orgId: number, userId: number, page: number = 0, size: number = 5, query?: string) {
    return this.getMemberContracts(orgId, userId, page, size, query || null).pipe(
      map(({ body }) => {
        const { data, pagination } = body;
        const contracts = data.map((contractDirty) => {
          const contract = new GetContract(contractDirty);
          return {
            contractDto: contract,
            name: `${contract.job.name}`,
            supervisor: `${contract?.supervisor?.name || ''}`,
            jobLevel: `${contract?.jobLevel || ''}`,
            dateStart: moment(contract.dateStart).format(constants.DATE_FORMAT_YYYY_MM_DD),
          };
        });
        return { contracts, pagination };
      }),
      tap(({ contracts, pagination }) => {
        this._contractsPaginated.next(contracts);
        this._pagination.next(pagination);
      }),
    );
  }
}
