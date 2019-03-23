import BaseModel from "../cores/model/BaseModel";
import BaseCall from "../cores/call/BaseCall";

class User extends BaseModel {
    constructor(data = {}) {
        super(data);

        this.accessToken = null;

        this.format = {
            username: {
                label: '用户名'
            },
            password: {
                label: '密码'
            },
            name: {
                label: '姓名',
            },
            phone: {
                label: '手机号'
            }
        };

        this.rules = [
            {attribute: 'username', validate: 'String'},
            {attribute: 'username', validate: 'Required'},
            {attribute: 'password', validate: 'String', options: { min: 6, max: 16 }},
            {attribute: 'password', validate: 'Required'},
        ];
    }


    /**
     * 读取用户信息
     * @param {object} params 参数
     * @param {function} fn 回调
     */
    load( params = {}, fn = undefined) {

    }

    /**
     * 登录
     * @param {object} params 参数
     * @param {function} fn 回调
     */
    login(params, fn) {
        BaseCall.post( 'login', { params: params }, (type, message, res) => {
            if( type !== 'success' ) {
                BaseModel.setTip(message);
            }
        } );
    }
}

export default User;