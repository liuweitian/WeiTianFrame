import dataDict from '../../configs/dataDict';

export default class DataDict {
    /**
     * 根据词典组名，返回 value => name 结构
     * @param {string} groupName 组名
     * @param {array} ignore 需要忽略的 value 值
     * @returns {{}}
     */
    static getValueName( groupName, ignore = [] ) {
        let result = {};
        for ( let item of dataDict[groupName] || [] ) {
            if( ignore.indexOf( item.value ) === -1 ) {
                result[ item.value ] = item.name;
            }
        }
        return result;
    }

    /**
     * 根据词典组名，返回 name => value 结构
     * @param {string} groupName 组名
     * @param {array} ignore 需要忽略的 name 值
     * @returns {{}}
     */
    static getNameValue( groupName, ignore = [] ) {
        let result = {};
        for ( let item of dataDict[groupName] || [] ) {
            if( ignore.indexOf( item.name ) === -1 ) {
                result[ item.name ] = item.value;
            }
        }
        return result;
    }

    /**
     * 根据词典组名和value，返回对应的 name
     * @param {string} groupName 组名
     * @param {string} value 需要查询的 value 值
     * @param {string} defaultName 如果找不到对应的 name ，则返回该值
     * @returns {*|string}
     */
    static getName(groupName, value, defaultName = '') {
        let list = this.getValueName( groupName );
        return list[value] || defaultName;
    }

    /**
     * 根据词典组名和name，返回对应的 value
     * @param {string} groupName 组名
     * @param {string} name 需要查询的 name 值
     * @param {string} defaultValue defaultValue 如果找不到对应的 value ，则返回该值
     * @returns {*|string}
     */
    static getValue(groupName, name,  defaultValue = '') {
        let list = this.getNameValue( groupName );
        return list[name] || defaultValue;
    }
}