import AppModel from "../baseModels/AppModel";

export default class Export extends AppModel {
    static CreateApi = 'export.create';
    static ListApi = 'export.list';

    constructor(props = {}) {
        super(props);

        this.format = {
            name: {
                label: '名称',
            },

            status: {
                label: '状态'
            },

            create_time: {
                label: '导出时间'
            },

            url: {
                label: '文件'
            }
        };
    }

}