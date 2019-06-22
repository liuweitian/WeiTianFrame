export default {
    ready: {
        type: Function,
    },

    // 地图中心
    center: {
        type: String,
        default: '北京'
    },

    // 缩放值
    zoom: {
        type: Number,
        default: 16,
    },

    /**
     * 海量点配置
     * @see http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a3b21
     */
    shapeConfig: {
        type: Object,
        default() {
            return {
                color: '#ff0000', // 颜色
                size: 'BMAP_POINT_SIZE_NORMAL', // 尺寸
                shape: 'BMAP_POINT_SHAPE_CIRCLE', // 形状
            };
        }
    },

    /**
     * 海量点的点击回调函数
     */
    shapeOnClick: {
        type: Function,
        default: () => {

        }
    },

    /**
     * 海量点
     * [{lng, lat}, {...}, {...}]
     */
    shapePoints: {
        type: Array,
        default() {
            return [];
        }
    },

    // 是否展示操作面板
    showBtn: {
        type: Boolean,
        default: true,
    },

    // 需要隐藏的操作面板名称
    hideBtn: {
        type: Array,
        default() {
            return [];
        }
    },

    /**
     * 自定义操作按钮
     */
    otherBtn: {
        type: Array,
        default() {
            return [

            ];
        }
    },

    /**
     * 折线
     */
    polylinePoints: {
        type: Array,
        default() {
            return [];
        }
    },

    /**
     * 多边形
     */
    polygonPoints: {
        type: Array,
        default() {
            return [
            ];
        }
    },

    /**
     * 圆形
     */
    circlePoints: {
        type: Object,
        default() {
            return {
            };
        }
    },

    /**
     * 围栏配置
     */
    fenceConfig: {
        type: Object,
        default() {
            return {
                color: '#00f', // 颜色
                weight: 2, // 宽度
                opacity: 0.5, // 透明度
                onChange: (e, type, data) => { // 围栏编辑时回调

                }
            };
        },
    },


    /**
     * 围栏编辑
     */
    fenceEdit: {
        type: Boolean,
        default: false,
    },
};