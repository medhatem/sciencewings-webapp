import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';

@Component({
  selector: 'user-contacts',
  templateUrl: './user-contacts.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserContactsComponent implements OnInit, OnDestroy {
  data: any;
  selectedMenu: string = 'Select organization';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._prepareChartData();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  private _prepareChartData(): void {
    this.data = this._route.snapshot.data;
  }
}
