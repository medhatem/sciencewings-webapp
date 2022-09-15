import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractService } from './contract.service';

@Injectable({
  providedIn: 'root',
})
export class ContractResolver {
  constructor(private _contractService: ContractService) {}
}
