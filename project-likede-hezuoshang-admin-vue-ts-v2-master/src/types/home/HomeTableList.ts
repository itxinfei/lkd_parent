export interface CardLiStData {
  date?: string;
  id?: string | null;
  nodeAmount?: number;
  nodeId?: string | null;
  nodeName?: string;
  orderCount?: number;
  orderTotalMoney?: number;
  ownerId?: number;
  ownerName?: string | null;
  ratio?: string | null;
  totalBill?: number;
  // [platname: string]: any
  currentPageRecords?: {} | null;
}

export interface SearchRes {
  totalCount?: string;
  pageIndex?: string;
  totalPage?: string;
  // currentPageRecords?: Array<string> | undefined
  currentPageRecords?: CardLiStData | {};
}

export interface PageInfo {
  current: number;
  total: number;
  size: number;
  totalPage?: number;
}