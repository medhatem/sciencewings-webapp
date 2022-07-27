import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Dictionary } from '@fullcalendar/core';
import { Subject } from 'rxjs';

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
  customClass: string;
}

export interface ListOption {
  columns: Column[];
  numnberOfColumns?: number;
  onElementClick?: (...args) => any;
}

@Component({
  selector: 'list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() dataList: any[] = [];
  @Input() options: ListOption = { columns: [], numnberOfColumns: 0 };
  @Input() message: any;

  @Output() output = new EventEmitter();

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  isLoading: boolean = false;
  searchInputControl: FormControl = new FormControl();
  keys: any[];
  headers: any[];
  cols = 4;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor() {}

  ngOnInit(): void {
    this.parseColumns();
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
    this.headers = this.options.columns.map((col) => col);
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
