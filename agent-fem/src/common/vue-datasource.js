/**
 * @author lifayu
 * @since 16/7/18
 *
 * // TODO: datasource支持串行&并行混合加载
 */
define(function (require) {

    var u = require('underscore');
    var $ = require('zepto');

    /**
     * 加载数据源
     * @param {Object} datasource 数据源列表
     * @param {Vue} vm 当前页面实例
     */
     function fetch(datasource, vm) {
        var keys = u.keys(datasource);

        var store = {};
        var array = [];

        var promiseCount = 0;

        var defererd = $.Deferred();
        function requestFinishHandler() {
            promiseCount++;
            if (promiseCount === array.length) {
                defererd.resolve(store);
            }
        }

        u.each(keys, function (key) {
            var fn = datasource[key];
            var ret = fn;
            if (typeof fn === 'function') {
                ret = fn.call(vm, vm.$route);
            }
            if (ret.promise) {
                array.push({
                    key: key,
                    promise: ret.promise()
                });
            }
            else {
                array.push({
                    key: key,
                    promise: $.Deferred().resolve(ret)
                });
            }
        });

        u.each(array, function (item) {
            item.promise.then(function (data) {
                store[item.key] = data;
                requestFinishHandler();
            }, function () {
                requestFinishHandler();
            });
        });
        if (array.length === 0) {
            defererd.resolve(store);
        }
        return defererd;
    }

    var asyncData = {
        route: {
            data: function (transition) {
                var vm = this;
                return fetch(this.$options.datasource, this).then(function (data) {
                    if (typeof vm.$options.datasourced === 'function') {
                        vm.$options.datasourced.call(vm, data);
                    }
                    return data;
                });
            }
        },
        datasource: {},
        // 异步数据源加载完毕后执行该回调方法
        // 在该方法中可以对`data`进行预处理
        datasourced: function () {}
    };
    function install(Vue) {
        //Vue.config.optionMergeStrategies.datasource = function () {
        //};
        Vue.options = Vue.util.mergeOptions(Vue.options, asyncData);
    }
    return install;
});
