export default class Compare {
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
        switch (options.type) {
            case '==':
                if( !(value == options.targetValue) ) {
                    hasError = true;
                    result[attribute].push(`${label}和${options.targetLabel}不相等`);
                }
                break;
            case '===':
                if( !(value === options.targetValue) ) {
                    hasError = true;
                    result[attribute].push(`${label}和${options.targetLabel}不相等`);
                }
                break;
            case '!=':
                if( !(value != options.targetValue) ) {
                    hasError = true;
                    result[attribute].push(`${label}必须不等于${options.targetLabel}`);
                }
                break;
            case '!==':
                if( !(value !== options.targetValue) ) {
                    hasError = true;
                    result[attribute].push(`${label}必须不等于${options.targetLabel}`);
                }
                break;
            case '>=':
                if( !(value >= options.targetValue) ) {
                    hasError = true;
                    result[attribute].push(`${label}必须大于或等于${options.targetLabel}`);
                }
                break;
            case '>':
                if( !(value > options.targetValue) ) {
                    hasError = true;
                    result[attribute].push(`${label}必须大于${options.targetLabel}`);
                }
                break;
            case '<=':
                if( !(value > options.targetValue) ) {
                    hasError = true;
                    result[attribute].push(`${label}必须小于或等于${options.targetLabel}`);
                }
                break;
            case '<':
                if( !(value > options.targetValue) ) {
                    hasError = true;
                    result[attribute].push(`${label}必须小于${options.targetLabel}`);
                }
                break;
        }

        return {
            hasError: hasError,
            result: result
        };
    }
}