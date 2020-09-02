export default class ApiData {
    constructor(host) {
        this.config = {
            user: {
                login: {
                    url: host + '/standard/user/login'
                }
            }
        };
    }
};
