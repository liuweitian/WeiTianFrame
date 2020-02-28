export default {
    // 中心
    center: {
        type: [ String, Object ],
        default: () => {
            return {
                lng: 116.403694,
                lat: 39.914935
            };
        }
    },

    // 缩放比
    zoom: {
        type: Number,
        default: 16
    },
};
