import { PageModelView } from './page'

export interface OrderPageModelView extends PageModelView{
    /**
     * 订单编号
     */
    orderNo?: string;
    /**
     * 开始日期
     */
    startDate?: string
    /**
     * 结束日期
     */
    endDate ?: string
}

export interface Order {
    /**
     * 订单金额(分为单位)
     */
    amount: number;
    /**
     * 订单日期
     */
    createTime: string;
    innerCode: string;
    orderNo: string;
    /**
     * 支付类型，1支付宝 2微信
     */
    payType: string;
    skuName: string;
    /**
     * 订单状态:0-创建;1-支付完成;2-出货成功;3-出货失败
     */
    status: number;
    /**
     * 点位地址
     */
    addr: string;
    /**
     * 完成时间
     */
    updateTime: string;
}
