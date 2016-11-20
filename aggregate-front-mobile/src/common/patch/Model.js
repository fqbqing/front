/**
 * Created by lifayu on 15/1/4.
 */
define(function (require) {

    var u = require('underscore');

    var Model = require('saber-mm/Model');

    var Resolver = require('saber-promise');

    var constants = require('../constants');

    // 相对于Vuex的`state`
    Model.prototype.datasource = {};

    // 提供状态变更事件
    Model.prototype.mutations = {};

    Model.prototype.getters = function () {
        return Object.keys(this.datasource);
    };

    Model.prototype.refetch = function (query) {
        return Resolver.resolved(this.store);
    };

    Model.prototype.fetch = function (query) {
        var me = this;
        me.query = query || {};
        var array = [];

        me.datasource.query = query;
        me.datasource.const = constants;

        var keys = Object.keys(me.datasource);

        var store = me.store || {};

        var promiseCount = 0;

        var defererd = new Resolver();
        function requestFinishHandler() {
            promiseCount++;
            if (promiseCount === array.length) {
                me.store = store;
                defererd.resolve(store);
            }
        }

        keys.forEach(function (key) {
            var fn = me.datasource[key];
            var ret = fn;
            if (typeof fn === 'function') {
                ret = fn.call(me, query);
            }
            if (ret.promise) {
                array.push({
                    key: key,
                    promise: ret
                });
            }
            else {
                array.push({
                    key: key,
                    promise: Resolver.resolved(ret)
                });
            }
        });

        array.forEach(function (item) {
            item.promise.then(function (data) {
                store[item.key] = data;
                requestFinishHandler();
            }, function () {
                requestFinishHandler();
            });
        });
        return defererd.promise();
    };
});
