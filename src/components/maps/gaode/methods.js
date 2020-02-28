export default {
    /**
     * 地图加载完成后的回调
     * @param BMap
     * @param map
     */
    onReady: function({BMap, map}) {
        this.jMap = map;
        this.BMap = BMap;
        this.$emit('onReady', { vMap: this, jMap: map });
    }
};
