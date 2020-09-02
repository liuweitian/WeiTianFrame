import Permission from "../helpers/Permission";

export default class VinCode {
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

        if( !this.vinCode( value ) ) {
            result.hasError = true;
            result.result[attribute].push(label + '格式不正确');
        }

        return result;
    }

    static vinCode(value, ignore = ['WT000000000000000']) {
        let result = true;

        // 不做空检验
        if( !value || value.length === 0 ) {
            return true;
        }

        // 放行万能车架号
        if( ignore.indexOf( value ) !== -1 ) {
            return true;
        }

        // 如果有该权限，则放行车架号校验
        if( Permission.hasPermission('校验规则_车架号不校验') ) {
            return true;
        }

        // 长度校验
        if( value.length !== 17 ) {
            result = false;
        }

        // 类型校验
        if( typeof value === 'number' ) {
            result = false;
        }

        // 车架号格式校验
        if( result ) {
            let aCharMap = {
                '0' : 0, '1' : 1, '2' : 2, '3' : 3, '4' : 4, '5' : 5, '6' : 6, '7' : 7, '8' : 8, '9' : 9,
                'A' : 1, 'B' : 2, 'C' : 3, 'D' : 4, 'E' : 5, 'F' : 6, 'G' : 7, 'H' : 8, 'J' : 1, 'K' : 2,
                'L' : 3, 'M' : 4, 'N' : 5, 'P' : 7, 'R' : 9, 'S' : 2, 'T' : 3, 'U' : 4, 'V' : 5, 'W' : 6,
                'X' : 7, 'Y' : 8, 'Z' : 9
            };

            let aWeightMap = [
                8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2
            ];

            let aCharKeys = [];

            for ( let sNode of Object.keys( aCharMap ) ) {
                aCharKeys.push( sNode );
            }

            value = value.toUpperCase();

            let tempCase = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'X' ];
            if( tempCase.indexOf( value.substr(8, 1) ) === -1 ) {
                result = false;
            }

            let valueList = value.split('');
            for ( let char of valueList ) {
                if( aCharKeys.indexOf( char ) === -1 ) {
                    result = false;
                    break;
                }
            }

            if( result ) {
                let iTotal = 0;
                for ( let i = 0; i < 17; i++ ) {
                    iTotal += aCharMap[value.substr(i, 1)] * aWeightMap[i];
                }

                let sMode = iTotal % 11;

                if( sMode < 10 && sMode === parseInt( value.substr(8, 1) ) ) {
                    result = true;
                } else {
                    result = 10 === sMode && 'X' === value.substr(8, 1);
                }
            }

        }

        return result;
    }
}
