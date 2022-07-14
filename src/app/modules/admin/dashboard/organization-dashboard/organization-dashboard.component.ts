import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ApexOptions } from 'apexcharts';
import { MatTableDataSource } from '@angular/material/table';
import { IOrganizationDashboard } from '../../resolvers/organization-dashboard/organization-dashboard.resolver';
import { Subject, takeUntil } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { FinanceService } from '@fuse/services/finance/finance.service';
@Component({
  selector: 'organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('recentTransactionsTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;
  readonly componentName = 'OrganizationDashboardComponent';
  recentProjects: any[];
  recentResources: any[];
  recentMemberships: any[];
  recentReservations: any[];
  isLoading: boolean = false;
  data: any;
  accountBalanceOptions: ApexOptions;
  recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  recentTransactionsTableColumns: string[] = ['profil', 'date', 'action'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private route: ActivatedRoute, private _toastrService: ToastrService, private _financeService: FinanceService) {}

  ngOnInit() {
    const { resources, projects, memberships, reservations } = this.route.snapshot.data.dashboardData as IOrganizationDashboard;

    this.recentProjects = projects;
    this.recentResources = resources;
    this.recentMemberships = memberships;
    this.recentReservations = reservations;
    this._financeService.data$.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.data = data;
      this.recentTransactionsDataSource.data = data.recentTransactions;
      this._prepareChartData();
    });
  }
  ngAfterViewInit(): void {
    this.recentTransactionsDataSource.sort = this.recentTransactionsTableMatSort;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  private _prepareChartData(): void {
    // Account balance
    this.accountBalanceOptions = {
      chart: {
        animations: {
          speed: 400,
          animateGradually: {
            enabled: false,
          },
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        width: '100%',
        height: '100%',
        type: 'area',
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#A3BFFA', '#667EEA'],
      fill: {
        colors: ['#CED9FB', '#AECDFD'],
        opacity: 0.5,
        type: 'solid',
      },
      series: this.data.accountBalance.series,
      stroke: {
        curve: 'straight',
        width: 2,
      },
      tooltip: {
        followCursor: true,
        theme: 'dark',
        x: {
          format: 'MMM dd, yyyy',
        },
        y: {
          formatter: (value): string => value + '%',
        },
      },
      xaxis: {
        type: 'datetime',
      },
    };
  }
}
