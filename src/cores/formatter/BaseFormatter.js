/**
 * 数据格式化基类
 */
export default class BaseFormatter {
    constructor( value , model, options = {}) {
        this.value = value;
        this.options = options || {};
        this.model = model;
    }

    getValue() {
        return this.value;
    }
}
