/**
 * Created by lifayu on 16/3/3.
 */
define(function () {

    var Resolver = require('saber-promise');
    var Vue = require('vue');
    var u = require('underscore');

    var mm = require('saber-mm');
    var routers = require('config');

    var $ = require('zepto');

    //var URL = require('saber-router/URL');
    var parseQuery = require('saber-uri/util/parse-query');

    var cachedAction = {};

    /**
     * 获取元素的本页跳转地址
     *
     * @inner
     * @param {HTMLElement} ele DOM元素
     * @return {!string}
     */
    function getLink(ele) {
        var target = ele.getAttribute('target');
        var href = ele.getAttribute('href');

        if (!href || (target && target !== '_self')) {
            return;
        }
        return href.indexOf(':') < 0 && href;
    }

    /**
     * 劫持全局的click事件
     *
     * @inner
     * @param {Event} e 事件参数
     */
    function hackClick(e) {
        var target = e.target;
        // 先上寻找A标签
        if (e.path) {
            for (var i = 0, item; item = e.path[i]; i++) {
                if (item.tagName === 'A') {
                    target = item;
                    break;
                }
            }
        }
        else {
            while (target && target.tagName !== 'A') {
                target = target.parentNode;
            }
        }
        if (!target) {
            return;
        }

        var href = getLink(target);
        if (href) {
            this.redirect(createURL(href));
            e.preventDefault();
            e.stopPropagation();
        }
    }

    function createURL(href) {
        var url = {};
        if (href.charAt(0) === '#') {
            href = href.substr(1);
            var arr = href.split('~');
            url.path = arr[0];
            url.query = parseQuery(arr[1]);
        }
        else {
            var arr = href.split('?');
            url.path = arr[0];
            url.query = parseQuery(arr[1]);
        }
        return url;
    }


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
                // 劫持全局的click事件
                $(vm.$el).off('click.hack').on('click.hack', u.bind(hackClick, vm));
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
            if (vm.action) {
                vm.action[cachedAction[vm.action.path] ? 'sleep' : 'leave']();
            }
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

    function fireUpstream(me, event) {
        if (me.$parent) {
            if (typeof me.$parent[event.name] === 'function') {
                me.$parent[event.name](event.data);
            }
            else {
                fireUpstream(me.$parent, event);
            }
        }
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
                //required: true,
                default: ''
            },
            query: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            id: {
                type: String,
                default: function () {
                    return (new Date()).getTime();
                }
            }
        },
        template: '<div><p style="text-align: center; margin: 20px; font-size: 12px; color: #999;">正在加载……</p></div>',
        data: function () {
            return {};
        },
        vuex: {
            actions: {
                dispatch: function (store, mutation) {
                    store.dispatch(mutation);
                }
            }
        },
        methods: {
            redirect: function (url) {
                //this.query = url.query;
                //this.url = url.path;
                this.changeLocation(url.path, url.query);
            },
            getAction: function () {
                var me = this;
                getAction(this).then(function (action) {
                    var events = ['finish', 'cancel'];
                    u.each(events, function (event) {
                        action.off(event);
                        action.on(event, function (result) {
                            me.$emit(event, result);
                            me.$destroy(true);
                        });
                    });
                    // 派发store的mutation
                    action.off('mutation');
                    action.on('mutation', function (mutation) {
                        //me.$emit('data', result, me.id);
                        me.dispatch(mutation);
                    });
                    // 逐级向上调用父级的action
                    action.off('upstream');
                    action.on('upstream', function (event) {
                        fireUpstream(me, event);
                    });

                }, function (error) {
                    me.$emit('error', error);
                });
            },
            changeLocation: function (url, query) {
                this.url = url;
                this.query = query;
                this.getAction();
            }
        },
        watch: {
            //url: function () {
            //    this.getAction();
            //}
        },
        ready: function () {
            if (this.url) {
                this.getAction();
            }
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