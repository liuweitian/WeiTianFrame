import Vue from 'vue';
export default class BaseCall {

    /**
     * 访问出错的默认处理逻辑
     * @param {object} response
     * @param {number} status
     */
    static defaultErrorCallback(response, status) {
        // 访问出错的默认处理逻辑
    }

    /**
     * 以GET方式访问url
     * @param {string} url
     * @param {{params, headers}} options
     * @param {function} successCb
     * @param {function} errorCb
     */
    static get(url, options, successCb, errorCb) {
        Vue.axios.get(url, options).then((r) => {
            successCb(r);
        }, (r) => {
            let status = r.response.data.status;
            typeof errorCb === 'function' ? errorCb( r, status ) : this.defaultErrorCallback( r, status );
        });
    }

    /**
     * 以POST方式访问url
     * @param {string} url
     * @param {{params, headers}} options
     * @param {function} successCb
     * @param {function} errorCb
     */
    static post(url, options, successCb, errorCb) {
        Vue.axios.post(url, options.params, options.headers).then((r) => {
            successCb(r);
        }, r => {
            let status = r.response.data.status;
            typeof errorCb === 'function' ? errorCb( r, status ) : this.defaultErrorCallback( r, status );
        });
    }
}