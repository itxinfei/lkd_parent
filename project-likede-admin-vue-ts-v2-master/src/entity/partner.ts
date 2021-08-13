import { PageModelView } from './page'

export interface PartnerPageModelView extends PageModelView{
    /**
     * 合作商名称
     */
    name?: string;
}

export interface PartnerModelView {
    /**
     * 合作商名称
     */
    name: string;
    /**
     * 联系人
     */
    contact: string;
    /**
     * 手机
     */
    mobile: string;
    /**
     * 座机
     */
    phone?: string;
    /**
     * 分成比例
     */
    ratio?: number;
    /**
     * 账号
     */
    account?: string;
    /**
     * 密码
     */
    password?: string;
}

export interface Partner {
    /**
     * 账号
     */
    account: string;
    /**
     * 联系人
     */
    contact: string;
    /**
     * 合作商Id
     */
    id: number;
    /**
     * 合作商名称
     */
    name: string;
    /**
     * 手机
     */
    mobile: string;
    /**
     * 座机
     */
    phone?: string;
    /**
     * 分成比例(10:就是10%)
     */
    ratio: number;
    /**
     * 设备数量
     */
    vmCount: number;
}
