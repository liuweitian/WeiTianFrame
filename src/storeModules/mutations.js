import Vue from 'vue';
let vue = new Vue();
export default {
    /**
     * 批量修改状态值
     * @param {object} state vuex的状态数
     * @param {object} target 需要修改的目标对象
     * @param {object} data 修改的值，键值对，对应target需要修改的键值对
     */
    update(state, { target, data }) {
        for (let name in data) {
            Vue.set( target, name, data[name ] )
        }
    },

    push(state, {target, data}) {
        for( let index in data ) {
            target.push( data[index] );
        }
    },

    setAccessToken(state, accessToken) {
        // accessToken会保存在cookies中，在里边null被保存为字符串的null，所以这里要判断一下
        accessToken = accessToken === 'null' ? undefined : accessToken;
        accessToken = accessToken === 'undefined' ? undefined : accessToken;
        state.user.accessToken = accessToken ? accessToken : undefined;
        if( accessToken ) {
            vue.$cookies.set('accessToken', accessToken);
        } else {
            vue.$cookies.remove('accessToken');
        }
    },
};