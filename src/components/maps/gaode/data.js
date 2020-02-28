export default function() {
    return {

        /**
         * 默认地图类型
         * 普通2D地图: BMAP_NORMAL_MAP
         * 简洁的卫星图: BMAP_SATELLITE_MAP
         * 带路标信息的卫星图: BMAP_HYBRID_MAP
         */
        mapType: 'BMAP_NORMAL_MAP',

        /**
         * 百度地图JS实例
         */
        jMap: undefined,

        /**
         * 百度地图库类
         */
        BMap: undefined,
    };
}
