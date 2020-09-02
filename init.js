let fs = require('fs');

// 创建本地接口定义文件
if( fs.copyFileSync('./environments/apiDev.js', './src/configs/js/apiDev.js') === undefined) {
    console.log("创建/src/configs/js/apiDev.js成功。\n");
}