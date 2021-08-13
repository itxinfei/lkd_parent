import { PageModelView } from './page'

export interface VmTypePageModelView extends PageModelView{
    /**
     * 售货机类型
     */
    name?: string;
}

export interface VmType {
    /**
     * 货道最大容量
     */
    channelMaxCapacity: number;
    /**
     * 图片url
     */
    image: string;
    /**
     * 型号编码
     */
    model: string;
    /**
     * 名称
     */
    name: string;
    typeId: number;
    /**
     * 列数
     */
    vmCol: number;
    /**
     * 行数
     */
    vmRow: number;
}

export interface VmTypeModelView {
    name: string;
    model: string;
    vmRow?: number;
    vmCol?: number;
    channelMaxCapacity?: number;
    image: string;
}

/**
 * 文件
 */
export interface FileData {
    name?: string
    url?: string
  }
