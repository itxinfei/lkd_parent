import { PageModelView } from './page'

export interface TaskPageModelView extends PageModelView {
    /**
     * 工单编号
     */
    taskCode?: string,
    /**
     * 工单状态
     */
    status?: number,
    /**
     * 是否是维修工单
     */
    isRepair?: boolean
}

export interface Task {
    /**
     * 地址
     */
    addr: string;
    /**
     * 工单负责人Id
     */
    assignorId: number;
    /**
     * 创建日期
     */
    createTime: string;
    /**
     * 创建类型，0:自动，1：手动
     */
    createType: number;
    /**
     * 工单描述
     */
    desc: string;
    /**
     * 设备编号
     */
    innerCode: string;
    /**
     * 所属区域Id
     */
    regionId: string;
    /**
     * 工单编号
     */
    taskCode: string;
    /**
     * 工单Id
     */
    taskId: string;
    /**
     * 工单状态
     */
    taskStatus: number;
    /**
     * 工单类型信息
     */
    taskType: Type;
    /**
     * 工单负责人名称
     */
    userName: string;
    /**
     * 最后更新时间
     */
    updateTime: string;
}

/**
 * 工单类型信息
 */
export interface Type {
    /**
     * 1：运维工单；2：运营工单
     */
    type: number;
    /**
     * 1：投放工单 2：补货工单 3：维修工单 4：撤机工单
     */
    typeId: number;
    /**
     * 类型名称
     */
    typeName: string;
}

export interface TaskStatus {
    /**
     * 状态Id
     */
    statusId: number;
    /**
     * 状态名
     */
    statusName: string;
}

export interface TaskModelView {
    /**
     * 创建人Id
     */
    userId: number;
    /**
     * 工单分配人Id
     */
    assignorId?: number;
    /**
     * 创建类型，传1
     */
    createType: number;
    /**
     * 描述信息
     */
    desc: string;
    /**
     * 补货信息(补货工单才有)
     */
    details: TaskDetail[];
    /**
     * 设备编号
     */
    innerCode: string;
    /**
     * 工单类型
     */
    productType?: number;
}

export interface TaskCancelModelView {
    /**
     * 工单编号
     */
    taskId: string;
    /**
     * 拒绝理由
     */
    desc: string;
}

export interface TaskDetail {
    /**
     * 货道编号
     */
    channelCode: string;
    /**
     * 补货数量
     */
    expectCapacity: number;
    /**
     * 商品Id
     */
    skuId: string;
    /**
     * 商品图片
     */
    skuImage: string;
    /**
     * 商品名称
     */
    skuName: string;
}

export interface AutoSupplyConfigViewModel {
    alertValue: number
}

export interface TaskType {
    /**
     * 1:运维类型;2：运营类型
     */
    type: number;
    /**
     * 类型Id
     */
    typeId: number;
    /**
     * 类型名称
     */
    typeName: string;
}

export interface UserTaskStats {
    /**
     * 拒绝总数
     */
    cancelTotal: number;
    /**
     * 完成数
     */
    completedTotal: number;
    /**
     * 统计的日期
     */
    date: string;
    /**
     * 进行中总数
     */
    progressTotal: number;
    /**
     * 是否是运维工单统计
     */
    repair: boolean;
    /**
     * 工单总数
     */
    total: number;
    /**
     * 工作人数
     */
    workerCount: number;
}

export interface UserTaskStatus {
    /**
     * 取消的工单数
     */
    cancelCount: number;
    /**
     * 发生日期
     */
    collectDate: string;
    /**
     * 完成数
     */
    finishCount: number;
    /**
     * 进行中总数
     */
    progressCount: number;
}

export interface UserTaskRank {
    /**
     * 用户名
     */
    userName: string;
    /**
     * 完成工单数
     */
    workCount: number;
}

export interface UserWork {
    /**
     * 拒绝工单数
     */
    cancelCount: number;
    /**
     * 当日进行中的工单
     */
    progressTotal: number;
    /**
     * 工单总数
     */
    total: number;
    userId: number;
    /**
     * 完成工单数
     */
    workCount: number;
}

export interface UserWorkModelView {
    userId: number;
    start: string;
    end: string;
}
