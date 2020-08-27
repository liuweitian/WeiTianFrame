const CompressionWebpackPlugin = require('compression-webpack-plugin');

let gzipList = [ 'css', 'js' ];
let mode = process.env.NODE_ENV;
let fileName = new Date().getTime();
module.exports = {
    // 构建好的文件输出目录
    publicPath: "/",
    // 构建项目目录
    outputDir: 'site/' + ( { production: 'prod', development: 'dev', test: 'test' }[mode] || 'test' ) + '/' + fileName,
    // 是否使用带有浏览器内编译器的完整构建版本
    lintOnSave: true,
    // babel-loader默认会跳过`node_modules`依赖
    runtimeCompiler: false,
    // 是否为生产环境构建生成sourceMap
    productionSourceMap: false,
    // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
    css: {
        // 允许生成 CSS source maps?
        extract: false,
        sourceMap: false,
        loaderOptions: {},
        modules: false
    },

    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + gzipList.join('|') + ')$'),//匹配文件名
                threshold: 10240,//对10K以上的数据进行压缩
                minRatio: 0.8,
                deleteOriginalAssets: false,//是否删除源文件
            })
        ]
    },
    devServer: {
        disableHostCheck: true
    },
};
