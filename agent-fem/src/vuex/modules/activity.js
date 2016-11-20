/**
 * Created by lifayu on 16/7/8.
 */
define(function () {
    return {
        actions: {
            setActivityList: function (store, list) {
                store.dispatch('SET_ACTIVITY_LIST', list);
            },
            appendActivityToList: function (store, list) {
                store.dispatch('APPEND_ACTIVITY_TO_LIST', list);
            },
            clearActivityList: function (store) {
                store.dispatch('SET_ACTIVITY_LIST', []);
            }
        },
        state: {
            list: []
        },
        mutations: {
            SET_ACTIVITY_LIST: function (state, list) {
                state.list = list;
            },
            APPEND_ACTIVITY_TO_LIST: function (state, list) {
                state.list = state.list.concat(list);
            }
        }
    };
});