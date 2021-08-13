import { PageModelView } from './page'

export interface SkuClassPageModelView extends PageModelView{
    /**
     * 商品类型名称
     */
    className?: string;
}

export interface SkuClassModelView {
    /**
     * 类型名
     */
    className: string
}

export interface SkuClass {
    /**
     * 类别Id
     */
    classId: number;
    /**
     * 类名称
     */
    className: string;
}
