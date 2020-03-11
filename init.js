let fs = require('fs');

// 创建本地接口定义文件
if( fs.copyFileSync('./environments/apiTest.js', './src/configs/apiTest.js') === undefined) {
    console.log("创建/src/configs/apiTest.js成功。\n");
}

if( process.argv.length > 2 ) {
    let ui = process.argv[2];

    // 创建ui布局
    let path = './src/views/layout';

    if( !fs.existsSync(path) ) {
        fs.mkdirSync(path);
    }

    if( fs.copyFileSync('./environments/'+ ui +'/main.vue', path + '/main.vue') === undefined ) {
        console.log("创建"+path+"/main.vue成功。\n");
    }
}

