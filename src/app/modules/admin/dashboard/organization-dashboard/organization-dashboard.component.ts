import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ApexOptions } from 'apexcharts';

import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationDashboardComponent implements OnInit {
  readonly componentName = 'OrganizationDashboardComponent';
  recentProjects: any[];
  recentResources: any[];
  isLoading: boolean = false;
  data: any;
  accountBalanceOptions: ApexOptions;
  recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  recentTransactionsTableColumns: string[] = ['transactionId', 'name', 'date', 'amount'];
  constructor(private route: ActivatedRoute, private _toastrService: ToastrService) {}

  async ngOnInit() {
    // Get the data
    const { data } = this.route.snapshot.data;
    console.log('data', data);
    if (!data) {
      this._toastrService.showError(this.componentName);
    }
    this.recentProjects = data;
    this.recentResources = data;
  }
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
