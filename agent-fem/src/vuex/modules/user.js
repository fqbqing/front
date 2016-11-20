/**
 * Created by lifayu on 16/7/8.
 */
define(function (require) {

    var api = require('config').api;

    return {
        actions: {
            setUser: function (store, info) {
                store.dispatch('SET_USER_INFO', info);
            },
            fetchUser: function (store) {
                return api.user().then(function (info) {
                    store.dispatch('SET_USER_INFO', info);
                    return info;
                });
            },
            registerAgent: function (store, data) {
                return api.register(data);
            },
            loginUser: function (store, data) {
                return api.login(data);
            },
            logout: function (store) {
                return api.logout().then(function () {
                    store.dispatch('SET_USER_INFO', {});
                });
            }
        },
        state: {
            value: {
                id: '',
                name: '',
                phone: '',
                avatar: ''
            }
        },
        mutations: {
            SET_USER_INFO: function (state, info) {
                state.value = info;
            }
        }
    };
});