import BaseFormatter from "./BaseFormatter";

export default class NumberFormatter extends BaseFormatter {
    constructor(value, model, options) {
        super(value, model, options);
        this.options = Object.assign({toFixed: 2, unit: undefined}, this.options);
    }

    getValue() {
        let value = this.value;

        if( this.value === undefined ) {
            return this.value;
        }

        if( typeof value !== 'number' ) {
            value = parseFloat( this.value );
        }

        value = isNaN( value ) ? 0 : value;

        if( this.options.toFixed ) {
            value = value.toFixed( this.options.toFixed );
        }

        if( this.options.unit ) {
            value += this.options.unit;
        }

        return value;
    }
}
