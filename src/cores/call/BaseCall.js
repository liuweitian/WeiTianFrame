import Vue from 'vue';
import ObjectHelper from "../helpers/ObjectHelper";
export default class BaseCall {

    /**
     * 根据名称获取URL
     * @param name
     * @returns {{}|null}
     */
    static getUrlForName(name) {
        return ObjectHelper.getValue( $api, name, null );
    }

    /**
     * 访问出错的默认处理逻辑
     * @param {object} response
     * @param {number} status
     */
    static defaultErrorCallback(response, status) {
        // 访问出错的默认处理逻辑
    }

    /**
     * 根据路径读取对象中的数据
     * @param {object} response
     * @param {string} _path
     */
    static getDataForPath(response, _path) {
        let value = response;
        let path = _path.split('.');

        for (let index in path) {
            value = value[ path[index] ];
            if( typeof value !== 'object' ) {
                return value;
            }
        }
        return value;
    }

    /**
     * 返回数据处理
     * @param {object} response
     * @param {object} urlItem
     * @param {function} successCb
     */
    static pathParse( response, urlItem, successCb ) {
        // 查询规则必须是个object才会进行处理
        if( typeof urlItem.maps === 'object') {
            for ( let map of urlItem.maps )  {
                let result = true;
                for( let _path in map.items ) {
                    // 根据配置好的字符串路径查找对象中的数据
                    let value = this.getDataForPath( response, _path );
                    let strict = ObjectHelper.getValue( map, 'strict', true );

                    // 如果查找到的数据和预定义的数据相等，则认为是命中条件的
                    result = result && ( ( strict && value === map.items[ _path ] ) || ( value == map.items[ _path ] ) );
                }
                // 如果单个类型配置中的条件全部命中，则调用成功回调
                if( result ) {
                    let message = '';
                    // 如果配置了消息路径，则根据路径在response中读取
                    if( map.message ) {
                        message = this.getDataForPath( response, map.message );
                    }
                    successCb( map.type, message, response );
                    return;
                }
            }
        }
        successCb( urlItem.defaultType, '', response );
    }

    /**
     * 以GET方式访问url
     * @param {string} urlName
     * @param {{params, headers}} options
     * @param {function} successCb
     * @param {function} errorCb
     */
    static get(urlName, options, successCb, errorCb) {
        let urlItem = this.getUrlForName(urlName);

        Vue.axios.get(urlItem.url, options).then((r) => {
            this.pathParse( r, urlItem, successCb );
        }, (r) => {
            let status = r.response.data.status;
            typeof errorCb === 'function' ? errorCb( r, status ) : this.defaultErrorCallback( r, status );
        });
    }

    /**
     * 以POST方式访问url
     * @param {string} urlName
     * @param {{params, headers}} options
     * @param {function} successCb
     * @param {function} errorCb
     */
    static post(urlName, options, successCb, errorCb) {
        let urlItem = this.getUrlForName(urlName);

        Vue.axios.post(urlItem.url, options.params, options.headers).then((r) => {
            this.pathParse( r, urlItem, successCb );
        }, r => {
            let status = r.response.data.status;
            typeof errorCb === 'function' ? errorCb( r, status ) : this.defaultErrorCallback( r, status );
        });
    }
}