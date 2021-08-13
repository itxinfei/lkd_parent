import { PageModelView } from './page'

export interface ReportModelView {
    partnerId?: number;
    start: string;
    end: string;
    innerCode?: string;
}

export interface ReportPageModelView extends PageModelView {
    partnerName?: string;
    start: string;
    end: string;
}

export interface ReportOrderStats {
    /**
     * 销售额（个）
     */
    orderCount: string;
    /**
     * 销售量（元）
     */
    orderAmount: string;
    /**
     * 分成（元）
     */
    totalBill: string;
}

export interface PartnerCollect {
    date: string;
    /**
     * 笔数
     */
    orderCount: number;
    /**
     * 收入
     */
    orderTotalMoney: number;
    /**
     * 合作商名称
     */
    ownerName: string;
    /**
     * 分成比例(整数)
     */
    ratio: number;
    /**
     * 分成金额
     */
    totalBill: number;
}

export interface SkuSaleRank {
    count: number;
    skuName: string;
}

export interface SkuCollect {
    /**
     * 商品销量
     */
    count: number;
    /**
     * 商品名称
     */
    skuName: string;
}
