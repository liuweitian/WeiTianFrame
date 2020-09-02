import store from "../../store";
import AppModel from "../baseModels/AppModel";

export default class User extends AppModel {
    constructor(props = {}) {
        super(props);

        this.accessToken = undefined;

        this.format = {
            username: {
                label: '用户名'
            },
            name: {
                label: '姓名',
            },
            phone: {
                label: '手机号'
            }
        };
    }

    /**
     * 登录
     * @param {function} callback 回调函数
     */
    login(callback) {
        setTimeout(() => {
            let type = 'success';
            let data = {
                message: '登录成功',
                data: {
                    name: '张三',
                    phone: '13200000000'
                },
                accessToken: 'a6013b3ce0d0b33b17025b0af9c5a765'
            };

            this.afterLogin({ type, data });
            callback({type, data});
        });
    }

    /**
     * 登录/获取用户信息后
     * @param type
     * @param data
     */
    afterLogin({type, data}) {
        if( type === 'success' ) {
            store.commit('setAccessToken', data.accessToken);
            store.state.user.updateData(data.data);
            if( !( this instanceof User ) ) {
                this.updateData(data.data);
            }
        }
    }

    /**
     * 退出
     */
    logout() {
        store.commit('setAccessToken', undefined);
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
