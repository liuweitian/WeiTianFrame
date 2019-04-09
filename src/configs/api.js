import main from './main';
import apiProd from './apiProd';
import apiDev from './apiDev';
import apiLocal from './apiLocal';
let api = apiProd;
if( main.env === 'dev' ) {
    api = apiDev;
} else if( main.env === 'local' ) {
    api = apiLocal;
}
export default api;