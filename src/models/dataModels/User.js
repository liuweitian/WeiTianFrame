import store from "../../store";
import AppModel from "../baseModels/AppModel";

class User extends AppModel {
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
     * @param {function} fn 回调
     */
    login(fn) {
        if( !this.validate() ) {
            fn( { type: 'error', data: { message: this.getOneError() } } );
        } else {
            setTimeout(() => {
                store.commit('setAccessToken', 'LJASD9FISJF8JSDF8SD8F');
                this.updateData({
                    name: '张三',
                    phone: '13266666666'
                });
                fn({ type: 'success', data: { message: '登录成功', data: Object.assign( {}, this.data ) } });
            });
        }
    }

    /**
     * 是否登录
     * @returns {boolean}
     */
    isLogin() {
        return this.getAccessToken() !== undefined;
    }

    /**
     * 获取授权令牌
     * @returns {string}
     */
    getAccessToken() {
        return this.accessToken;
    }
}


export default User;
