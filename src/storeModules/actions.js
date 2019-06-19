export default {
    /**
     * 全局消息提醒
     * @param store
     * @param {string} text 需要提醒的内容
     * @param {number} duration 提醒时长
     * @param {string} type 提醒的风格，默认是info，可能的值有：success/warning/info/error
     */
    showTip(store, { text, type, duration }) {
        type = type || 'info';
        duration = duration || 2000;

        store.commit('update', {
            target: store.state.tip,
            data: {
                text: text,
                type: type,
                duration: duration,
                id: Math.random(),
            }
        });
    },

    /**
     * 展示模态框
     * @param store
     * @param {string} title 标题
     * @param {Component} view 内容，component实例
     * @param {string} width 宽度
     * @param {function} onClose 关闭模态框回调
     * @param {$ObjMap} options，其他选项，在view组件中可以通过this.$store.state.modal.options获取
     */
    showModal(store, { title, view, width, options, onClose }) {
        title = title || '';
        width = width || '600px';
        options = options || {};
        store.commit('update', {
            target: store.state.modal,
            data: {
                title: title,
                view: view,
                width: width,
                onClose: onClose,
                options: options,
                id: Math.random(),
            }
        });
    },

    /**
     * 隐藏模态框
     * @param store
     */
    hideModal(store) {
        store.commit('update', {
            target: store.state.modal,
            data: {
                title: '',
                view: undefined,
                width: '30%',
                id: undefined,
                onClose: undefined,
                options: {}
            }
        });
    },

    /**
     * 显示通知信息
     * @param {object} store
     * @param {string} title 标题
     * @param {string} text 内容
     * @param {number} duration 时长
     * @param {string} type 类型
     * @param {function} onClose 关闭回调
     */
    showNotice(store, { title, text, duration, type, onClose }) {
        duration = duration || 15000;
        type = type || 'info';
        title = title || '通知';
        store.commit('update', {
            target: store.state.notice,
            data: {
                id: Math.random(),
                title: title,
                message: text,
                duration: duration,
                type: type,
                onClose: onClose,
            }
        });
    },
};