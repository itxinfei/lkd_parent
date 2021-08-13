export interface ChannelModelView {
    channelList: ChannelList[];
    /**
     * 售货机编号
     */
    innerCode: string;
}

export interface ChannelList {
    /**
     * 货道编码(如：1-1,1-2)
     */
    channelCode: string;
    /**
     * 商品Id
     */
    skuId: string;
}

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
