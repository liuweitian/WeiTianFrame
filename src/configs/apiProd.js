export default {
    login: {
        url: 'http://localhost/v1/site/login',
        maps: [
            {
                type: 'success',
                data: {
                    message: 'data.message'
                },
                items: {
                    'status': 200,
                    'data.status': 200,
                }
            },
            {
                type: 'error',
                data: {
                    message: 'data.message'
                },
                items: {
                    'status': 200,
                    'data.status': 400,
                }
            },
        ],
    }
};