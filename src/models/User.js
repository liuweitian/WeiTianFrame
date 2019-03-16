import BaseModel from "../cores/model/BaseModel";

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
            {attribute: 'username', validate: 'String', options: { list: ["sdf"] }},
            {attribute: 'password', validate: 'String'},
        ];
    }


    /**
     * 读取用户信息
     * @param {object} params 参数
     * @param {function} fn 回调
     */
    load( params = {}, fn = undefined) {

        setTimeout( () => {
            typeof fn === 'function' ? fn( { message: '读取用户信息成功' } ) : '';
            BaseModel.setTip('读取用户信息成功');
        }, 1000 );

    }

    /**
     * 登录
     * @param {object} params 参数
     */
    login(params) {
        setTimeout( () => {
            typeof fn === 'function' ? fn( { message: '登录成功' } ) : '';
            BaseModel.setTip('登录成功');
        }, 100 );
    }
}

export default User;