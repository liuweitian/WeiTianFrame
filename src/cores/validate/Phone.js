
export default class Phone {
    /**
     * 校验
     * @param {string} label 字段标题
     * @param {string} attribute 需要校验的字段名
     * @param {string} value 需要校验的值
     * @param {object} options 校验的额外参数
     * @returns {object} 校验结果
     */
    static validate(label, attribute, value, options = {}) {
        let result = {
            hasError: false,
            result: {}
        };
        result.result[attribute] = [];

        if( !this.phone( value ) ) {
            result.hasError = true;
            result.result[attribute].push(label + '格式不正确');
        }

        return result;
    }

    static phone(value) {
        let result = true;
        if( !value || value.length === 0 ) {
            return result;
        }
        if(!(/^\d{10,12}$/.test(value))) {
            result = false;
        }
        return result;
    }
}
