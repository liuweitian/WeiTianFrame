import apiConfig from "./api/config";

let mode = process.env.NODE_ENV;
export default {
    appName: '尾田框架',

    // 调试模式
    debug: true,

    // 运行环境
    env: { production: 'prod', development: 'dev', test: 'test' }[mode] || 'dev',

    // ui配置
    ui: {
        plugin: 'element',
    },

    // 接口配置
    api: apiConfig,

    // 定时队列配置
    queue: {
        // 消费间隔
        timeout: 100,
    }
};
