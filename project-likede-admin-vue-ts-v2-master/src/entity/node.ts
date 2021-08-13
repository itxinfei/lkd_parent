import { PageModelView } from './page'

export interface NodePageModelView extends PageModelView {
    /**
     * 点位名称
     */
    name?: string;
    /**
     * 区域id
     */
    regionId?: string;
}

export interface Nodes {
    /**
     * 点位地址
     */
    addr: string;
    /**
     * 所属商圈Id
     */
    businessId: number;
    /**
     * 商圈信息
     */
    businessType: BusinessType;
    /**
     * 创建人Id
     */
    createUserId: number;
    /**
     * 点位Id
     */
    id: string;
    /**
     * 点位名称
     */
    name: string;
    /**
     * 点位主Id
     */
    ownerId: number;
    /**
     * 点位主名称
     */
    ownerName: string;
    /**
     * 区域信息
     */
    region: Region;
    /**
     * 所属区域Id
     */
    regionId: string;
    /**
     * 包含售货机数
     */
    vmCount: number;
    /**
     * 市
     */
    areaCode: number;
}

/**
 * 商圈信息
 */
export interface BusinessType {
    /**
     * 商圈名
     */
    name: string;
}

/**
 * 区域信息
 */
export interface Region {
    /**
     * 区域名称
     */
    name: string;
}

export interface NodeVmDetail {
    /**
     * 售货机编号
     */
    innerCode: string;
    /**
     * 最后一次补货时间
     */
    lastSupplyTime: string;
    /**
     * 售货机状态，0:未投放;1-运营;3-撤机
     */
    vmStatus: number;
}

export interface NodeModelView {
    /**
     * 详细地址
     */
    addr: string;
    /**
     * 市
     */
    areaCode: number;
    /**
     * 所属商圈Id
     */
    businessId?: number;
    /**
     * 创建人Id
     */
    createUserId: number;
    /**
     * 名称
     */
    name: string;
    /**
     * 合作商Id
     */
    ownerId?: number;
    /**
     * 合作商名称
     */
    ownerName?: string;
    /**
     * 所属区域Id
     */
    regionId?: string;
}

export interface NodeCollect {
    /**
     * 合作商名称
     */
    name: string;
    /**
     * 点位数
     */
    value: number;
}
