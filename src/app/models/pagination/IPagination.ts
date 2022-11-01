export interface IPagination {
  length: number;
  size: number;
  page: number;
  lastPage: number;
  startIndex: number;
  endIndex: number;
}

export class Pagination {
  length: number;
  size: number;
  page: number;
  lastPage: number;
  startIndex: number;
  endIndex: number;
  constructor(p: any) {
    const { length, size, page, lastPage, startIndex, endIndex } = p || {};
    Object.assign(this, { length, size, page, lastPage, startIndex, endIndex });
  }
}
