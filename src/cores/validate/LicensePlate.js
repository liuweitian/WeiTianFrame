export default class LicensePlate {
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

        if( !this.licensePlate( value ) ) {
            result.hasError = true;
            result.result[attribute].push(label + '格式不正确');
        }

        return result;
    }

    static licensePlate(value, ignore = [ '新车' ]) {
        let result = true;

        if( !value || value.length === 0 ) {
            return result;
        }

        if( ignore.indexOf( value ) !== -1 ) {
            return result;
        }

        if( value.length < 7 ) {
            result = false;
        }
        if( value.length > 8 ) {
            result = false;
        }

        if( result ) {
            let firstWord = [
                '京','津','沪','渝','冀','豫','云','辽','黑','湘','皖',
                '鲁','新','苏','浙','赣','鄂','桂','甘','晋','蒙','陕',
                '吉','闽','贵','粤','青','藏','川','宁','琼','使','领',
            ];
            let secondWord = [
                'a','b','c','d','e','f','g','h','i','j',
                'k','l','m','n','o','p','q','r','s','t',
                'u','v','w','x','y','z',
            ];

            let words = value.split('');

            if( firstWord.indexOf( words[0] ) === -1 ) {
                result = false;
            }

            if( secondWord.indexOf( words[1].toLowerCase() ) === -1 ) {
                result = false;
            }
        }

        return result;
    }
}
