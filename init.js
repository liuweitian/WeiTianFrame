let fs = require('fs');

// 创建本地接口定义文件
if( fs.copyFileSync('./environments/apiDev.js', './src/configs/apiDev.js') === undefined) {
    console.log("创建/src/configs/apiDev.js成功。\n");
}