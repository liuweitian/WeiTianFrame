export default class Number {
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

        if (typeof value !== 'number') {
            hasError = true;
            result[attribute].push(label + "必须是数字");
        }
        else {
            let min = options.min;
            let max = options.max;
            if (min !== undefined) {
                if (value < min) {
                    hasError = true;
                    result[attribute].push(label + "必须大于" + min);
                }
            }
            if (max !== undefined) {
                if (value > max) {
                    hasError = true;
                    result[attribute].push(label + "必须小于" + max);
                }
            }
        }
        return {
            hasError: hasError,
            result: result
        };
    }
}