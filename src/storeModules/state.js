import tip from './states/tip';
import User from '../models/User';
let user = new User();
export default {
    // 全局消息提示
    tip: tip,

    // 用户模块，管理登录、注销以及用户信息
    user: user,
};