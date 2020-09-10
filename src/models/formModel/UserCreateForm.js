import User from "../dataModels/User";
import {Input} from "element-ui";

export default class UserCreateForm extends User {
    getFormConfig() {
        return [
            {
                attribute: 'username',
                view: Input,
            },
            {
                attribute: 'phone',
                view: Input,
            },
            {
                attribute: 'name',
                view: Input,
            },
        ];
    }
}