import User from "../dataModels/User";

export default class LoginForm extends User {
    constructor(props = {}) {
        super(props);

        this.format = Object.assign(this.format, {
            password: {
                label: '密码'
            }
        });

        this.rules = [
            {attribute: 'username', validate: 'String'},
            {attribute: 'username', validate: 'Required'},
            {attribute: 'password', validate: 'String', options: { min: 6, max: 16 }},
            {attribute: 'password', validate: 'Required'},
        ];
    }
}