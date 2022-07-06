import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { GroupService } from 'app/modules/admin/resolvers/groups/groups.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

export interface InventoryPagination {
  length: number;
  size: number;
  page: number;
  lastPage?: number;
  startIndex?: number;
  endIndex?: number;
}

export interface Column {
  [key: string]: { name: string };
}

export interface Option {
  columns: Column[];
}

@Component({
  selector: 'list-component',
  templateUrl: './list-component.component.html',
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() dataList: any[] = [];
  @Input() options: Option = { columns: [] };
  @Output() output = new EventEmitter();

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  groups$: any;
  isLoading: boolean = false;
  selectedGroup = null;
  groupsCount: number = 0;
  pagination: InventoryPagination;
  searchInputControl: FormControl = new FormControl();
  keys: any[];
  headers: string[];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _groupService: GroupService, private _changeDetectorRef: ChangeDetectorRef, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.parseColumns();
    this.pagination = { length: 10, size: 5, page: 1 };
  }

  handlePageEvent(event: PageEvent) {
    this.pagination.length = event.length;
    this.pagination.size = event.pageSize;
    this.pagination.page = event.pageIndex;
    lastValueFrom(this._groupService.getGroups(event.pageIndex, event.pageSize));
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  openGroupForm() {}

  /**
   *
   */
  parseColumns() {
    this.keys = Array.prototype.concat.apply(
      [],
      this.options.columns.map((col) => Object.keys(col).map((key) => key)),
    );
    this.headers = Array.prototype.concat.apply(
      [],
      this.options.columns.map((col) => Object.keys(col).map((key) => col[key].name)),
    );
    console.log('keys are ', this.keys, this.headers);
  }
}
