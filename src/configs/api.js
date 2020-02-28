import main from './main';
import apiProd from './apiProd';
import apiDev from './apiDev';
import apiTest from './apiTest';
let api = apiProd;
if( main.env === 'dev' ) {
    api = apiDev;
}
if( main.env === 'test' ) {
    api = apiTest;
}
export default api;
