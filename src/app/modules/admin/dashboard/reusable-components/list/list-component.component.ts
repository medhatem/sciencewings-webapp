import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, lastValueFrom } from 'rxjs';

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
  columnName: string;
  columnPropertyToUse: string;
}

export interface Option {
  columns: Column[];
  numnberOfColumns?: number;
}

@Component({
  selector: 'list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() dataList: any[] = [];
  @Input() options: Option = { columns: [], numnberOfColumns: 0 };
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
  cols = 4;

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
   * extract the keys and the headers from options.columns
   *
   */
  parseColumns() {
    this.keys = this.options.columns.map((col): string => col.columnPropertyToUse);
    this.headers = this.options.columns.map((col) => col.columnName);
    if (!this.options.numnberOfColumns) {
      this.options.numnberOfColumns = this.keys.length;
    }
  }

  /**
   * dynamically create a grid with variable amount of columns
   */
  getColumsStyles() {
    return { 'grid-template-columns': `repeat(${this.options.numnberOfColumns}, 1fr)` };
  }
}
