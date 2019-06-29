import tip from './states/tip';
import modal from './states/modal';
import notice from './states/notice';
import messageBox from './states/messageBox';
import loading from './states/loading';
import User from '../models/User';
let user = new User();
export default {
    // 消息提示
    tip: tip,

    // 模态框
    modal: modal,

    // 消息通知
    notice: notice,

    // 对话框
    messageBox: messageBox,

    // loading遮罩
    loading: loading,

    // 用户模块，管理登录、注销以及用户信息
    user: user,

    // 权限列表
    permission: [],
};