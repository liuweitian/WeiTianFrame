export default {
    // 默认解析配置
    defaultMaps: [
        {
            type: 'success',
            data: {
                message: 'data.msg',
                items: 'data.data.items',
                meta: 'data.data._meta',
                data: 'data.data',
            },
            items: {
                'status': 200,
                'data.code': 200,
            }
        },
        {
            type: 'error',
            data: {
                message: 'data.msg',
                attribute: 'data.data.attribute',
            },
            items: {
                'status': 200,
                'data.code': 400,
            }
        },
    ],
    // 访问出错的处理函数
    // 这个时默认处理，如果在get或者post时传递了errorCb（第四个参数），则默认使用自定义处理，否则执行它
    errorCallBack(response, status) {
        console.log( response, status );
    },

    // 授权信息
    auth: {
        // 是否自动在header中添加授权校验信息
        autoAdd: true,
        // 授权header键名
        authName: 'Authorization',
        // 授权值模板，{token}表示具体的token值，将从store.state.user.getAccessToken()获取
        authTemplate: 'Bearer {token}',
    },
};