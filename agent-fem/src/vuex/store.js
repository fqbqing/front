/**
 * Created by lifayu on 16/7/8.
 */
define(function (require) {

    var Vue = require('vue');
    var Vuex = require('vue/vuex');

    var u = require('underscore');
    var actions = require('./actions');

    function fetchModule(module) {
        return u.pick(module, 'state', 'mutations');
    }

    var state = {};
    var mutations = {};

    var store = new Vuex.Store({
        state: state,
        mutations: mutations,
        actions: actions,
        modules: {
            user: fetchModule(require('./modules/user')),
            activity: fetchModule(require('./modules/activity')),
            award: fetchModule(require('./modules/award')),
            listview: fetchModule(require('./modules/listview'))
        }
    });
    return store;
});
