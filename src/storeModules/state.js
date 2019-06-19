import tip from './states/tip';
import modal from './states/modal';
import notice from './states/notice';
import User from '../models/User';
let user = new User();
export default {
    // 消息提示
    tip: tip,

    // 模态框
    modal: modal,

    // 消息通知
    notice: notice,

    // 用户模块，管理登录、注销以及用户信息
    user: user,
};