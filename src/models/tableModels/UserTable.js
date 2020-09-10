import BaseTable from "../../cores/model/BaseTable";
import User from "../dataModels/User";
import {Input} from "element-ui";
import UserCreateForm from "../formModel/UserCreateForm";

export default class UserTable extends BaseTable {
    static Model = User;
    static CreateModel = UserCreateForm;

    getColumns() {
        return [
            {
                attribute: 'username',
            },
            {
                attribute: 'name'
            },
            {
                attribute: 'phone'
            },
        ];
    }

    getSearchConfig() {
        return [
            {
                attribute: 'username',
                view: Input,
            },
            {
                attribute: 'name',
                view: Input,
            },
            {
                attribute: 'phone',
                view: Input,
            },
        ];
    }
}