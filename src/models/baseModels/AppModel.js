import BaseModel from "../../cores/model/BaseModel";
import BaseModels from "../../cores/model/BaseModels";
import Api from "../../cores/call/Api";

export default class AppModel extends BaseModel {
    static ModelsClassName = BaseModels;
    static ListApi = '';
    static InfoApi = '';
    static CreateApi = '';
    static UpdateApi = '';

    /**
     * 获取表单配置
     * @returns {*[]}
     */
    getFormConfig() {
        return [];
    }

    /**
     * 获取原始数据
     * @param {boolean} isCopy 是否深拷贝
     * @returns {Object}
     */
    getSourceData(isCopy = true) {
        return isCopy ? Object.assign({}, this.data) : this.data;
    }

    /**
     * 获取新建接口需要的请求数据
     * @returns {*}
     */
    getCreateParams() {
        return this.getSourceData();
    }

    /**
     * 获取更新接口需要的请求数据
     * @returns {*}
     */
    getUpdateParams() {
        return this.getSourceData();
    }

    /**
     * 获取搜索接口需要的请求数据
     * @returns {*}
     */
    getSearchParams() {
        return this.getSourceData();
    }

    /**
     * 获取列表
     * @param {object} params
     * @param {function} callback
     */
    static list( params, callback ) {
        Api.instance()
            .setUrlPath(this.ListApi)
            .setGetParams(params)
            .setSuccessCallback(({type, data}) => {
                if( type === 'success' ) {
                    data.models = this.instanceList( data.items, this.ModelsClassName );
                }
                callback( {type, data} );
            })
            .get();
    }

    /**
     * 新建
     * @param {function} callback
     */
    create(callback) {
        if( !this.validate() ) {
            callback({type: 'error', data: { message: this.getOneError(), attribute: 'a' }});
            return ;
        }

        Api.instance()
            .setUrlPath(this.constructor.CreateApi)
            .setPostParams(this.getCreateParams())
            .setSuccessCallback(({type, data}, res) => {
                if( type !== 'success' ) {
                    this.addError( data.attribute, data.message );
                } else {
                    this.clearErrors();
                    this.updateData( data.data );
                }
                callback( {type, data} );
            })
            .raw();
    }

    /**
     * 更新
     * @param {function} callback
     */
    update(callback) {
        Api.instance()
            .setUrlPath( this.constructor.UpdateApi )
            .setPostParams( this.getUpdateParams() )
            .setGetParams( { id: this.getId() } )
            .setSuccessCallback(({type, data}) => {
                if( type !== 'success' ) {
                    this.addError( data.attribute, data.message );
                } else {
                    this.clearErrors();
                    this.updateData( data.data );
                }
                callback( {type, data} );
            })
            .raw();
    }

    /**
     * 详情
     * @param {function} callback
     */
    info(callback) {

        Api.instance()
            .setUrlPath(this.constructor.InfoApi)
            .setGetParams( { id: this.getId() } )
            .setSuccessCallback(({type, data}) => {
                if( type !== 'success' ) {
                    this.addError( data.attribute, data.message );
                } else {
                    this.clearErrors();
                    this.updateData( data.data );
                }
                callback( {type, data} );
            })
            .get();
    }
}