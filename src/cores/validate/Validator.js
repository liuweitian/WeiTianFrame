import String from "./String";
import ObjectHelper from "../helpers/ObjectHelper";
import Number from "./Number";
import Required from "./Required";
import Compare from "./Compare";
import VinCode from "./VinCode";
import LicensePlate from "./LicensePlate";
import Phone from "./Phone";

export default class Validator {
    /**
     * 校验
     * @param {object} data
     * @param {BaseModel} model
     * @returns {{hasError: boolean, result: Array}}
     */
    static validate(data, model) {
        let rules = model.rules;
        let result = [];
        for (let m in rules) {
            let item = rules[m];
            let name = item.attribute;
            let label = model.getLabel(item.attribute);
            let value = data[name];
            let options = ObjectHelper.getValue(item, 'options', {});
            switch (item.validate) {
                case 'Required':
                    result.push(Required.validate(label, name, value, options));
                    break;
                case 'Number':
                    result.push(Number.validate(label, name, value, options));
                    break;
                case 'String':
                    result.push(String.validate(label, name, value, options));
                    break;
                case 'VinCode':
                    result.push(VinCode.validate(label, name, value, options));
                    break;
                case 'LicensePlate':
                    result.push(LicensePlate.validate(label, name, value, options));
                    break;
                case 'Phone':
                    result.push(Phone.validate(label, name, value, options));
                    break;
                case 'Compare':
                    options.targetValue = data[ options.target ];
                    options.targetLabel = model.getLabel( options.target );
                    result.push(Compare.validate(label, name, value, options));
                    break;
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