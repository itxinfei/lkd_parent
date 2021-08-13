import { PageModelView } from './page'

export interface RegionPageModelView extends PageModelView {
    /**
     * 区域名称
     */
    name?: string;
}

export interface RegionModelView {
    /**
     * 区域名称
     */
    regionName: string;
    /**
     * 备注
     */
    remark: string;
}

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
     * 点位数量
     */
    nodeCount: number;
    /**
     * 备注
     */
    remark: string;
}
