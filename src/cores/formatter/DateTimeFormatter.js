import BaseFormatter from "./BaseFormatter";
import WtDate from "../helpers/WtDate";

/**
 * 日期时间格式化
 */
export default class DateTimeFormatter extends BaseFormatter {
    /**
     * @param {string} value
     * @param {BaseModel} model
     * @param {{fromNow, template}} options
     */
    constructor(value, model, options) {
        super(value, model, options);
        this.options = Object.assign( {fromNow: false, template: 'Y-m-d H:i:s'}, this.options );
    }

    getValue() {
        if( !this.value ) {
            return this.value;
        }

        let value = WtDate.formatDateTime( this.value, this.options.template );
        if( this.options.fromNow ) {
            value += ' ( '+WtDate.fromNow( this.value )+' )';
        }
        return value;
    }
}
