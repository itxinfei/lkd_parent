import { PageModelView } from './page'

export interface VmPageModelView extends PageModelView{
    /**
     * 售货机状态(0:未投放;1-运营;3-撤机)
     */
    status?: number;
    /**
     * 售货机编号
     */
    innerCode?: string;
}

export interface VmModelView {
    /**
     * 创建人Id
     */
    createUserId: number;
    /**
     * 所属点位Id
     */
    nodeId: string;
    /**
     * 售货机类型Id
     */
    vmType?: number;
}

// TODO: 可以和channel.ts的Channel合并
export interface Channel {
    /**
     * 货道编号
     */
    channelCode: string;
    /**
     * 货道Id
     */
    channelId: string;
    /**
     * 当前容量
     */
    currentCapacity: number;
    /**
     * 最大容量
     */
    maxCapacity: number;
    /**
     * 商品
     */
    sku?: ChannelSku;
    /**
     * 商品Id
     */
    skuId: string;
    /**
     * 补货数量
     */
    expectCapacity: number;
}

/**
 * 商品
 */
export interface ChannelSku {
    /**
     * 商品图片
     */
    skuImage: string;
    /**
     * 商品名称
     */
    skuName: string;
}

export interface BusinessType {
    /**
     * 商圈类型Id
     */
    id: number;
    /**
     * 商圈类型名
     */
    name: string;
}

export interface Vm {
    /**
     * 所属商圈Id
     */
    businessId: number;
    /**
     * 是否故障。故障:true,正常:false
     */
    fault: boolean;
    /**
     * 售货机Id
     */
    id: string;
    /**
     * 机器编号
     */
    innerCode: string;
    /**
     * 上次补货时间
     */
    lastSupplyTime: string;
    /**
     * 所属点位信息
     */
    node: Node;
    /**
     * 点位Id
     */
    nodeId: string;
    /**
     * 合作商名称
     */
    ownerName: string;
    /**
     * 所属区域信息
     */
    region: Region;
    /**
     * 所属区域Id
     */
    regionId: string;
    status: Status;
    /**
     * 售货机类型
     */
    type: Type;
    /**
     * 售货机状态，0:未投放;1-运营;3-撤机
     */
    vmStatus: number;
    /**
     * 售货机类型Id
     */
    vmType: number;
}

export interface Status {
    '10001': boolean;
    '10002': boolean;
    '10003': boolean;
}

/**
 * 所属点位信息
 */
export interface Node {
    /**
     * 点位详细地址
     */
    addr: string;
    /**
     * 点位Id
     */
    id: string;
    /**
     * 点位名称
     */
    name: string;
}

/**
 * 所属区域信息
 */
export interface Region {
    /**
     * 区域Id
     */
    id: string;
    /**
     * 区域名称
     */
    name: string;
    /**
     * 区域下点位数
     */
    nodeCount: number;
}

/**
 * 售货机类型
 */
export interface Type {
    /**
     * 类型名
     */
    name: string;
    /**
     * 货道最大容量
     */
    channelMaxCapacity: number;
}

// TODO: 可以和sku合并
export interface Top10Sku {
    /**
     * 商品图片
     */
    image: string;
    /**
     * 商品Id
     */
    skuId: string;
    /**
     * 商品名称
     */
    skuName: string;
}

export interface ApplyPolicyModelView {
    /**
     * 售货机编号列表
     */
    innerCodeList: string[];
    /**
     * 策略Id
     */
    policyId?: number;
}
