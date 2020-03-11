import TableModels from "../../cores/model/TableModels";
import User from "../dataModels/User";
import demoColumn from '../../components/element/tableColumns/demoColumn';
import actionColumn from "../../components/element/tableColumns/actionColumn";

export default class UserTable extends TableModels {
    constructor(props) {
        super(props);

        this.modelInstance = new User({
            // 此处可输入搜索表单默认值
        });

        this.searchColumns = [
            {attribute: 'username', type: 'input', span: 4},
            {attribute: 'phone', type: 'input', span: 4},
            {attribute: 'password', type: 'input', span: 4},
        ];

        this.columns = [
            {
                attribute: 'username',
                view: demoColumn,
            },
            {
                attribute: 'password',
                options: { width: 500}
            },
            {
                attribute: 'phone',
            },
            {
                label: '操作',
                view: actionColumn,
                buttons: [
                    {
                        icon: 'wt-icon-xiugai',
                        onClick:  this.onUpdate,
                    }
                ]
            },
        ];
    }

    onUpdate({ model, index }) {
        console.log( '点击了第' + ( index + 1 ) + '行' );
    }

}
