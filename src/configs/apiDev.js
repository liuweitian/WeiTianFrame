export default {
    login: {
        url: 'http://localhost/v1/site/login',
        maps: [
            {
                type: 'success',
                message: 'data.message',
                items: {
                    'status': 200,
                    'data.status': 200,
                }
            },
            {
                type: 'error',
                message: 'data.message',
                items: {
                    'status': 200,
                    'data.status': 400,
                }
            },
        ],
    }
};