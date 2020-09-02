import BaseFormatter from "./BaseFormatter";
import WtDate from "../helpers/WtDate";

export default class TimeFormatter extends BaseFormatter {
    constructor(value, model, options) {
        super(value, model, options);
        this.options = Object.assign( { template: 'd天H小时i分钟' }, this.options );
    }

    getValue() {
        let value = parseInt(this.value);

        if( this.value === undefined ) {
            return this.value;
        }
        value = isNaN( value ) ? 0 : value;
        return WtDate.formatSecond( value, this.options.template );
    }
}
