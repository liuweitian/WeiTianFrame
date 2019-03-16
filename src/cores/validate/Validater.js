import String from "./String";
import ObjectHelper from "../helpers/ObjectHelper";
import Number from "./Number";
import Required from "./Required";

export default class Validater {
    /**
     * 校验
     * @param {object} data
     * @param {object} rules
     * @returns {{hasError: boolean, result: Array}}
     */
    static validate(data, rules) {
        let result = [];
        for (let name in data) {
            for (let m in rules) {
                let item = rules[m];
                if (item.attribute === name) {
                    switch (item.validate) {
                        case 'Required':
                            result.push(Required.validate(name, data[name], ObjectHelper.getValue(item, 'options', {})));
                            break;
                        case 'Number':
                            result.push(Number.validate(name, data[name], ObjectHelper.getValue(item, 'options', {})));
                            break;
                        case 'String':
                            result.push(String.validate(name, data[name], ObjectHelper.getValue(item, 'options', {})));
                            break;
                    }
                }
            }
        }

        let validate = {
            hasError: false,
            result: {}
        };

        for (let item of result) {
            validate.hasError = validate.hasError || item.hasError;
            for (let name in item.result) {
                let errors = item.result[name + ''];
                if( errors.length && !validate.result[ name + '' ] ) {
                    validate.result[name + ''] = [];
                }
                for(let error of errors) {
                    validate.result[name + ''].push(error);
                }
            }
        }
        return validate;
    }
}