import BaseModel from "../cores/model/BaseModel";
import BaseCall from "../cores/call/BaseCall";

class User extends BaseModel {
    constructor(data = {}) {
        super(data);

        this.accessToken = undefined;

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
     * 登录
     * @param {object} params 参数
     * @param {function} fn 回调
     */
    login(params, fn) {
        BaseCall.post( 'login', { params: params }, (type, message, res) => {
            if( type !== 'success' ) {
                typeof fn === 'function' ? fn(type, message, res) : '';
            }
        } );
    }

    isLogin() {
        return this.data.accessToken !== undefined;
    }
}


export default User;