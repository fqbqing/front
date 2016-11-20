/**
 * Created by lifayu on 16/3/3.
 */
define(function () {

    var Resolver = require('saber-promise');
    var Vue = require('vue');
    var u = require('underscore');

    var mm = require('saber-mm');
    var routers = require('config');

    var cachedAction = {};

    /**
     * 保存当前Action相关信息
     *
     * @inner
     * @param {Action} action action对象
     * @param {Object} route 路由信息
     */
    function dumpInfo(action, route) {
        if (action && route.cached) {
            cachedAction[route.path] = action;
        }
    }

    function getAction(vm) {
        var url = vm.url;
        var route = u.findWhere(routers, {
            path: url
        });
        if (route) {
            // 设置当前的路由信息
            // 考虑再三，还是将query与params合并吧
            route.query = vm.query || {}; // extend(params, query);
            route.options = {}; //options;
            route.url = url;
            route.done = function () {
                //console.log('done');
                vm.$emit('complete');
            };
            vm.route = route;
            // 尝试加载Action
            return tryLoadAction(route, vm);
        }
        else {
            vm.$emit('error', 'can\'t find route: ' + url);
            //throw new Error();
            return Resolver.rejected();
        }
    }

    function tryLoadAction(route, vm) {

        var resolver = new Resolver();
        window.require([route.action], function (config) {
            if (!cachedAction[route.path] || route.options.noCache) {
                mm.create(config).then(function (action) {
                    // 将`action`追加到vue实例上
                    vm.action = action;

                    action.isChild = true;
                    // 将子页面的模板与正常页面分开
                    action.view.templateMainTarget = action.view.templateMainTarget + '_child';
                    action.set(route.path);
                    // 视图与数据已经ready了
                    // 将action生命周期中所有的方法&事件都应该触发执行
                    action.enter(vm.$el, route.path, route.query, route.options).then(function () {
                        action.ready();
                        action.complete();
                        route.done();

                        dumpInfo(action, route);
                    }, function () {
                        action.emit('error', null, {
                            route: extend({}, route),
                            action: action,
                            page: null
                        });
                        route.done();
                        vm.$emit('error');
                        vm.$destroy(true);
                    });
                    resolver.resolve(action);
                });
            }
            else {
                action = cachedAction[route.path];
                vm.action = action;
                action.view.set(vm.$el);
                action.model.refetch().then(function (data) {
                    action.view.render(data);
                    action.wakeup(route.path, route.query, route.options).then(function () {
                        action.revived();
                        action.complete();
                        route.done();
                    });
                });
                resolver.resolve(action);
            }
        });
        return resolver.promise();
    }

    /**
     * 子页面视图
     * @events
     *  - complete 页面加载完成时触发
     *  - finish 回调结束时触发
     *  - cancel 取消页面的时候触发
     *  - error 页面加载错误时触发
     */
    var ActionView = Vue.extend({
        replace: true,
        props: {
            url: {
                type: String,
                default: ''
            },
            query: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            id: {
                type: String
            }
        },
        template: '<div><p style="text-align: center; margin: 20px; font-size: 12px; color: #999;">正在加载……</p></div>',
        data: function () {
            return {};
        },
        methods: {
            redirect: function () {
                return true;
            }
        },
        ready: function () {
            var me = this;
            getAction(this).then(function (action) {
                var events = ['finish', 'cancel'];
                u.each(events, function (event) {
                    action.on(event, function (result) {
                        me.$emit(event, result);
                        me.$destroy(true);
                    });
                });
            }, function (error) {
                me.$emit('error', error);
                me.$destroy(true);
            });
        },
        destroyed: function () {
            if (this.action) {
                if (this.route.cached) {
                    this.action.sleep();
                }
                else {
                    this.action.leave();
                }
            }
        }
    });

    Vue.component('action-view', ActionView);

    return ActionView;
});