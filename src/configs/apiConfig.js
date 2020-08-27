export default class ApiData {
    constructor(host) {
        this.config = {
            userLogin: {
                url: host + '/standard/user/login'
            }
        };
    }
};
