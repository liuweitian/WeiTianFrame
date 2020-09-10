import BaseFactories from "./src/BaseFactories";
import Api from "../cores/call/Api";
import store from "../store";

export default class ExportFactories extends BaseFactories {

    static Timeout = 5000;

    afterRun() {
        Api.instance()
            .setUrlPath('export.info')
            .setGetParams(this.data)
            .setSuccessCallback(({type, data}) => {
                if( type !== 'success' || data.data.status !== 2 ) {
                    this.rePush();
                } else {
                    this.notice(data);
                }
            })
            .setErrorCallback(() => {
                this.rePush();
            })
            .get();
    }

    rePush() {
        setTimeout(() => {
            store.commit('push', {
                target: store.state.queueList,
                data: [ new ExportFactories(this.data) ]
            });
        }, this.constructor.Timeout);
    }

    notice(data) {
        store.dispatch('showMessageBox', {
            title: '导出成功',
            type: 'success',
            text: data.data.title + ' 导出成功，点击<a href="'+ data.data.url +'" target="_blank">这里下载</a>，或者稍后前往导出任务查询。'
        });
    }
}