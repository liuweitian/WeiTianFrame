import main from './main';
import apiProd from './apiProd';
import apiDev from './apiDev';
let api = apiProd;
if( main.env === 'dev' ) {
    api = apiDev;
}
export default api;