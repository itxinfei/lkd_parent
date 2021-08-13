import { PageModelView } from './page'

export interface PolicyPageModelView extends PageModelView{
    /**
     * 策略名称
     */
    policyName?: string;
}

export interface PolicyModelView {
    /**
     * 折扣比例数
     */
    discount?: number;
    /**
     * 策略名称
     */
    policyName: string;
}

export interface VmPolicy {
    /**
     * 折扣数据
     */
    discount: number;
    /**
     * 策略Id
     */
    policyId: number;
    /**
     * 策略名
     */
    policyName: string;
    /**
     * 售货机Id
     */
    vmId: string;
}

export interface Policy {
    /**
     * 折扣值
     */
    discount: number;
    /**
     * 策略Id
     */
    policyId: string;
    /**
     * 策略名
     */
    policyName: string;
    /**
     * 创建日期
     */
    createTime: string;
}

export interface PolicyVm {
    /**
     * 售货机编号
     */
    innerCode: string;
    /**
     * 点位名称
     */
    nodeName: string;
}
