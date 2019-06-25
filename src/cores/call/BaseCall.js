import Vue from 'vue';
import main from '../../configs/main';
import api from '../../configs/api';
import ObjectHelper from "../helpers/ObjectHelper";
import store from '../../store';
export default class BaseCall {

    /**
     * 根据名称获取URL
     * @param name
     * @returns {{}|null}
     */
    static getUrlForName(name) {
        return ObjectHelper.getValue( api, name, null );
    }

    /**
     * 访问出错的默认处理逻辑
     * @param {object} response
     * @param {number} status
     */
    static defaultErrorCallback(response, status) {
        // 访问出错的默认处理逻辑
        main.api && typeof main.api.errorCallBack === 'function' && main.api.errorCallBack( response, status );
    }

    static dataParse(response, data) {
        let result = {};
        for ( let name in data ) {
            result[ name ] = ObjectHelper.getDataForPath( response, data[name] );
        }
        return result;
    }

    /**
     * 返回数据处理
     * @param {object} response
     * @param {object} urlItem
     * @param {function} successCb
     */
    static pathParse( response, urlItem, successCb ) {
        if( main.api && main.api.defaultMaps ) {
            if( typeof urlItem.maps !== 'object' ) {
                urlItem.maps = main.api.defaultMaps;
            }
        }

        // 查询规则必须是个object才会进行处理
        if( typeof urlItem.maps === 'object') {
            for ( let map of urlItem.maps )  {
                let result = true;
                for( let _path in map.items ) {
                    // 根据配置好的字符串路径查找对象中的数据
                    let value = ObjectHelper.getDataForPath( response, _path );
                    let strict = ObjectHelper.getValue( map, 'strict', true );

                    // 如果查找到的数据和预定义的数据相等，则认为是命中条件的
                    result = result && ( ( strict && value === map.items[ _path ] ) || ( value == map.items[ _path ] ) );
                }
                // 如果单个类型配置中的条件全部命中，则调用成功回调
                if( result ) {
                    let data = {};
                    if( map.data ) {
                        data = BaseCall.dataParse( response, map.data );
                    }
                    successCb( { type: map.type, data: data }, response );
                    return;
                }
            }
        }
        successCb( { type: undefined, data: {} }, response );
    }

    /**
     * 处理header信息
     * @param options
     * @returns {*}
     */
    static parseOptions(options) {
        options.params = options.params || {};
        options.headers = options.headers || {};
        let authConfig = main.api.auth;
        if( authConfig && authConfig.autoAdd === true && store.state.user.getAccessToken() ) {
            options.headers[ authConfig.authName ] = authConfig.authTemplate.replace('{token}', store.state.user.getAccessToken() );
        }
        return options;
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

        Vue.axios.get(urlItem.url, this.parseOptions( options )).then((r) => {
            this.pathParse( r, urlItem, successCb );
        }, (e) => {
            let r = e.response;
            let status = r.status;
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
        options = this.parseOptions( options );

        Vue.axios.post(urlItem.url, options.params, { headers: options.headers }).then((r) => {
            this.pathParse( r, urlItem, successCb );
        }, e => {
            let r = e.response;
            let status = r.status;
            typeof errorCb === 'function' ? errorCb( r, status ) : this.defaultErrorCallback( r, status );
        });
    }
}