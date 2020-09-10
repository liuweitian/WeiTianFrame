export default class ApiData {
    constructor(host) {
        this.config = {
            user: {
                login: {
                    url: host + '/standard/user/login'
                },

                list: {
                    url: host + '/standard/user/list'
                },

                create: {
                    url: host + '/standard/user/create'
                },
            },

            export: {
                info: {
                    url: host + '/standard/export/info'
                },

                create: {
                    url: host + '/standard/export/create'
                }
            }
        };
    }
};
