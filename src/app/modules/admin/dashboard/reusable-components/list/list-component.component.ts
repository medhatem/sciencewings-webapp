import { NgSwitchCase } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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

export interface TableBtn {
  styleClass?: string;
  icon?: string;
  payload?: any;
  actionName: string;
  onActionClick?: (...args) => any;
}

export interface ListOption {
  columns: Column[];
  onElementClick?: (...args) => any;
}

@Component({
  selector: 'list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() dataList: any[] = [];
  @Input() actionButtons: TableBtn[] = [];
  @Input() options: ListOption = { columns: [] };
  @Input() message: any;

  @Output() output = new EventEmitter();
  @Output() buttonClick = new EventEmitter<string[]>();

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  isLoading: boolean = false;
  searchInputControl: FormControl = new FormControl();
  keys: any[];
  displayedColumns: string[];
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
    this.keys = this.options.columns.map((col) => col);
    if (!this.options.columns.length) {
      this.options.columns.length = this.keys.length;
    }
  }

  actionHandler(actionName: string) {
    switch (actionName) {
      case 'Delete': {
        console.log('DELETE');
        break;
      }
      case 'Download': {
        console.log('DOWNLOAD');
        break;
      }
      default: {
        console.log('NO ACTIONS');
        break;
      }
    }
  }

  /**
   * dynamically create a grid with variable amount of columns
   */
  getColumsStyles() {
    return { 'grid-template-columns': `repeat(${this.options.columns.length}, 1fr)` };
  }
}
