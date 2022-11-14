import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { MemberContractsFormComponent } from '../member-contracts-form/member-contracts-form.component';
import { ContractService } from 'app/modules/admin/resolvers/contract/contract.service';
import { ListOption, TableBtn } from '../../reusable-components/list/list-component.component';
import { ContractRo, GetContract } from 'app/models/contract/contract';
import { MemberUpdateContractComponent } from '../member-update-contract/member-update-contract.component';
import { constants } from 'app/shared/constants';
import { Pagination } from 'app/models/pagination/IPagination';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { PageEvent } from '@angular/material/paginator';
import { takeUntil, Subject, switchMap, map, debounceTime } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-member-contracts',
  templateUrl: './member-contracts.component.html',
  styleUrls: ['./member-contracts.component.scss'],
})
export class MemberContractsComponent implements OnInit {
  @Input() userId: number;
  @Input() orgId: number;

  options: ListOption = { columns: [] };
  actionButtons: TableBtn[] = [];

  searchInputControl: FormControl = new FormControl();

  contracts: any[] = [];
  conDto: any;
  openedDialogRef: any;
  pagination: Pagination;
  isLoading: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _contractService: ContractService,
    private _toastrService: ToastrService,
    private _cdr: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._contractService.contractsPaginated$.pipe(takeUntil(this._unsubscribeAll)).subscribe((contracts) => {
      this.contracts = contracts;
      this._cdr.markForCheck();
    });

    this._contractService.pagination$.pipe(takeUntil(this._unsubscribeAll)).subscribe((pagination) => {
      this.pagination = pagination;
      this._cdr.markForCheck();
    });

    this.options = {
      columns: [
        { columnName: 'ORGANIZATION.CONTRACTS.FORM.JOB_NAME', columnPropertyToUse: 'name', customClass: 'hidden' },
        { columnName: 'ORGANIZATION.CONTRACTS.FORM.SUPERVISOR', columnPropertyToUse: 'supervisor', customClass: 'hidden' },
        { columnName: 'ORGANIZATION.CONTRACTS.FORM.JOB_LEVEL', columnPropertyToUse: 'jobLevel', customClass: 'hidden' },
        { columnName: 'ORGANIZATION.CONTRACTS.FORM.STARTDATE', columnPropertyToUse: 'dateStart', customClass: 'hidden' },
        { columnName: '', columnPropertyToUse: 'actions', customClass: '' },
      ],
    };
    this.actionButtons = [
      { actionName: 'ORGANIZATION.ACTIONS.EDIT', onActionClick: this.onElementSelected.bind(this), icon: 'pencil' },
      { actionName: 'ORGANIZATION.ACTIONS.PRINT_CONTRACT', onActionClick: this.printContract.bind(this), icon: 'printer' },
      { actionName: 'ORGANIZATION.ACTIONS.SEND_CONTRACT_EMAIL', onActionClick: this.sendContractByEmail.bind(this), icon: 'mail' },
      { actionName: 'ORGANIZATION.ACTIONS.DELETE', onActionClick: this.deleteContract.bind(this), icon: 'trash' },
    ];

    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.isLoading = true;
          return this._contractService.getAndParseMemberContracts(this.orgId, this.userId, this.pagination.page, this.pagination.size, query);
        }),
        map(() => {
          this.isLoading = false;
        }),
      )
      .subscribe();
  }

  openInviteContractDialog(): void {
    const orgID = this.orgId;
    const userId = this.userId;
    if (!orgID) {
      this._toastrService.showError('Something went wrong!');
    }
    this.openedDialogRef = this._matDialog
      .open(MemberContractsFormComponent, {
        data: { orgID, userId },
      })
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async () => {
        await lastValueFrom(
          this._contractService.getAndParseMemberContracts(this.orgId, this.userId, this.pagination.page, this.pagination.size),
        );
        this._cdr.markForCheck();
      });
  }

  async onElementSelected(item: any) {
    const orgID = this.getOrganizationIdFromLocalStorage();
    const userId = this.userId;
    const contractDto = item.contractDto;
    this.openedDialogRef = this._matDialog
      .open(MemberUpdateContractComponent, {
        data: { orgID, userId, contractDto },
      })
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async () => {
        await lastValueFrom(
          this._contractService.getAndParseMemberContracts(this.orgId, this.userId, this.pagination.page, this.pagination.size),
        );
        this._cdr.markForCheck();
      });
  }

  async pageEvent(event: PageEvent) {
    this.pagination = {
      ...this.pagination,
      length: event.length,
      size: event.pageSize,
      page: event.pageIndex,
      lastPage: event.previousPageIndex,
    };
    await lastValueFrom(this._contractService.getAndParseMemberContracts(this.orgId, this.userId, this.pagination.page, this.pagination.size));
  }

  async deleteContract(item: GetContract) {
    await this._contractService.delete(item.id);
    await lastValueFrom(this._contractService.getAndParseMemberContracts(this.pagination.page, this.pagination.size));
    this._cdr.markForCheck();
  }

  printContract() {
    //TO DO : This function to print the member
    // contrcat to do later
  }
  sendContractByEmail() {
    //TO DO : This function to send the given
    // contract by email to do later
  }

  private getOrganizationIdFromLocalStorage(): number {
    return Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
  }
}
