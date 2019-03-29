import ObjectHelper from "../helpers/ObjectHelper";

export default class String {
    /**
     * 校验
     * @param {string} label 字段标题
     * @param {string} attribute 需要校验的字段名
     * @param {string} value 需要校验的值
     * @param {object} options 校验的额外参数
     * @returns {object} 校验结果
     */
    static validate(label, attribute, value, options = {}) {
        let hasError = false;
        let result = {
        };
        result[attribute] = [];

        if (typeof value !== 'string') {
            hasError = true;
            result[attribute].push(label + "必须是字符串");
        }
        else {
            let min = options.min;
            let max = options.max;
            let list = options.list;
            if (min !== undefined) {
                if (value.length < min) {
                    hasError = true;
                    result[attribute].push(label + "长度必须大于" + min);
                }
            }
            if (max !== undefined) {
                if (value.length > max) {
                    hasError = true;
                    result[attribute].push(label + "长度必须小于" + max);
                }
            }
            if( typeof list === 'object' ) {
                if( !ObjectHelper.inArray( list, value ) ) {
                    hasError = true;
                    result[attribute].push(label + "内容不合法");
                }
            }
        }
        return {
            hasError: hasError,
            result: result
        };
    }
}