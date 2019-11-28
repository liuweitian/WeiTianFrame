let prod = process.env.NODE_ENV==='production';

module.exports = {
    // 构建好的文件输出目录
    baseUrl: "/",
    // 构建项目目录
    outputDir: prod ? "site/prod" : "site/dev",
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
};
