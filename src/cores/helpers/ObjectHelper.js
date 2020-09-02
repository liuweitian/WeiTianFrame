export default {
    /**
     * 模仿yii里的 ArrayHelper::getValue
     * @param {object} object
     * @param {string | int} index
     * @param defaultValue
     * @returns {*}
     */
    getValue(object, index, defaultValue) {
        if( typeof object !== 'object' ) {
            return defaultValue;
        }
        return object[index] || defaultValue;
    },

    /**
     * 根据路径读取对象中的数据
     * @param {object} response
     * @param {string} _path
     */
    getDataForPath(response, _path) {
        let value = response;
        let path = _path.split('.');

        for (let index in path) {
            value = value[ path[index] ];
            if( typeof value !== 'object' ) {
                return value;
            }
        }
        return value;
    }
}