/**
 * 分页
 */
export class Page<T> {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public pageIndex: string,
    public pageSize: string,
    public totalPage: string,
    public totalCount: string,
    public currentPageRecords: T[]
  ) {}
}

export const defaultPage = {
  pageIndex: '0',
  pageSize: '0',
  totalPage: '0',
  totalCount: '0',
  currentPageRecords: []
}

export interface PageModelView {
  /**
     * 当前页码
     */
    pageIndex: number;
    /**
     * 每页数据个数
     */
    pageSize: number;
}

// 用于下拉列表搜索全部内容
export const loadAllParams = {
  pageIndex: 1,
  pageSize: 100000
}
