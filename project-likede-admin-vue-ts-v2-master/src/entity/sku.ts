import { PageModelView } from './page'

export interface SkuPageModelView extends PageModelView{
    /**
     * 商品名称
     */
    skuName?: string;
    /**
     * 商品类别Id
     */
    classId?: string;
}

export interface Sku {
    /**
     * 品牌名称
     */
    brandName: string;
    /**
     * 创建日期
     */
    ceateTime: string;
    /**
     * 类别Id
     */
    classId: number;
    /**
     * 价格
     */
    price: number;
    /**
     * 商品类别信息
     */
    skuClass: SkuClass;
    /**
     * 商品Id
     */
    skuId: string;
    /**
     * 图片Url
     */
    skuImage: string;
    /**
     * 商品名称
     */
    skuName: string;
    /**
     * 净含量
     */
    unit: string;
}

/**
 * 商品类别信息
 */
export interface SkuClass {
    /**
     * 类别Id
     */
    classId: number;
    /**
     * 类别名称
     */
    className: string;
}

export interface SkuModelView {
    brandName: string;
    classId?: number;
    price?: number;
    skuImage: string;
    skuName: string;
    unit: string;
    skuId?: string;
}
