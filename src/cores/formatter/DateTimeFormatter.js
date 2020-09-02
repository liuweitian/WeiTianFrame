import BaseFormatter from "./BaseFormatter";
import WtDate from "../helpers/WtDate";

/**
 * 日期时间格式化
 */
export default class DateTimeFormatter extends BaseFormatter {
    /**
     * @param {string} value
     * @param {{fromNow, template}} options
     */
    constructor(value, options = {fromNow: true, template: 'Y-m-d H:i:s'}) {
        super(value, options);
    }

    getValue() {
        let value = WtDate.formatDateTime( this.value, this.options.template );

        if( this.options.fromNow ) {
            value += ' ( '+WtDate.fromNow( this.value )+' )';
        }
        return value;
    }
}
