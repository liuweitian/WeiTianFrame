export default {
    appName: '尾田框架',

    // 调试模式
    debug: true,

    // 运行环境
    env: 'dev',

    ui: {
        plugin: 'element',
    },

    // 接口配置
    api: {
        // 默认解析配置
        defaultMaps: [
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
        // 访问出错的处理函数
        // 这个时默认处理，如果在get或者post时传递了errorCb（第四个参数），则默认使用自定义处理，否则执行它
        errorCallBack(response, status) {
            console.log( response, status );
        }
    }
};