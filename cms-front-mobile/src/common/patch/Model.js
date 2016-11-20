/**
 * Created by lifayu on 15/1/4.
 */
define(function (require) {

    var u = require('underscore');

    var Model = require('saber-mm/Model');

    var Resolver = require('saber-promise');

    var constants = require('../constants');

    Model.prototype.datasource = {};

    Model.prototype.refetch = function (query) {
        return Resolver.resolved(this.store);
    };

    Model.prototype.fetch = function (query) {
        var me = this;
        me.query = query || {};
        var array = [];
        //if (me.datasource.query || me.datasource.const) {
            //console.warn('不建议重新设置query和const');
            // TODO 后退的时候也会进入这个入口,有时间再分析
        //}
        //else {
            me.datasource.query = query;
            me.datasource.const = constants;
        //}
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
                //ret.then(function (data) {
                //    store[key] = data;
                //});
            }
            else {
                array.push({
                    key: key,
                    promise: Resolver.resolved(ret)
                });
                //store[key] = ret;
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


        // 当所有请求都结束之后，将数据回填到`store`中，并且开始渲染页面
        //Resolver.all(array).then(requestFinishHandler, requestFinishHandler);

        //Resolver.all(array).then(function (ret) {
            //var data = me.store || {};
            //keys.forEach(function (key, i) {
            //    data[key] = ret[i];
            //});
            //me.store = data;
            //defererd.resolve(data);
        //}, function (result) {
            // 提供全局失败错误提示
            //defererd.resolve({
            //    const: constants,
            //    query: query
            //});
        //});
        return defererd.promise();
    };
});
