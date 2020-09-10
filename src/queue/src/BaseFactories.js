import store from "../../store";
import main from '../../configs/main';
/**
 * 生产者基类
 */
export default class BaseFactories {
    /**
     * 生产者基类
     * @param {object} data 消费时需要的数据
     * @param {function} callback 被消费后的回调函数
     */
    constructor( data , callback ) {
        /**
         * 队列消费时需要的数据
         * @type {{}}
         */
        this.data = data || {};

        /**
         * 被消费后的回调函数
         * @type {Function}
         */
        this.callback = callback;
    }

    /**
     * 执行
     */
    run() {
        typeof this.callback === 'function' ? this.callback() : '';
        this.afterRun();
    }

    /**
     * 执行后的钩子
     */
    afterRun() {

    }

    /**
     * 开启消费
     * @returns {number}
     */
    static start() {
        return setInterval(() => {
            BaseFactories.shift();
        }, main.queue.timeout);
    }

    /**
     * 消费方法
     */
    static shift() {
        if( store.state.queueList.length ) {
            let instance = store.state.queueList[0];
            store.commit('remove', {
                target: store.state.queueList,
                index: 0
            });
            if( instance instanceof BaseFactories) {
                return instance.run();
            } else {
                return this.shift();
            }
        }
    }
}