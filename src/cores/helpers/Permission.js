import store from '../../store';

export default class Permission {
    static hasPermission(name) {
        let permission = store.state.permission;
        return permission.indexOf( name ) !== -1;
    }

    static hasPermissionAnd(list) {
        let result = true;
        let permission = store.state.permission;
        for ( let index in list ) {
            result = result && permission.indexOf( list[index] ) !== -1;
            if( !result ) {
                break;
            }
        }
        return result;
    }

    static hasPermissionOr(list) {
        let result = true;
        let permission = store.state.permission;
        for ( let index in list ) {
            result = permission.indexOf( list[index] ) !== -1;
            if( result ) {
                break;
            }
        }
        return true;
    }
}