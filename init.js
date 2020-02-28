let fs = require('fs');

fs.copyFile( './environments/apiTest.js', './src/configs/apiTest.js', ( error ) => {
    if(error) {
        console.log(error + '\n');
    } else {
        console.log("创建apiTest.js成功。\n");
    }
} );
