/**
 * 分页类
 */
export class Page<T> {
  constructor(
    public currentPageRecords: T[],
    public pageIndex: string,
    public pageSize: string,
    public totalCount: string,
    public totalPage: string
  ) {}
}
