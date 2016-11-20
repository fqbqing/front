/**
 * Created by lifayu on 16/7/8.
 */

define(function (require) {

    var env = require('saber-env');
    var consts = require('common/constants');
    var Vue = require('vue');
    var Vuex = require('vue/vuex');
    var VueRouter = require('vue/vue-router');
    var VueDatasource = require('common/vue-datasource');

    require('common/filter');

    Vue.use(Vuex);
    Vue.use(VueRouter);
    Vue.use(VueDatasource);

    if (consts.ENV !== 'prod') {
        // ************* DEV START ************* //
        Vue.config.debug = true;
        Vue.config.devtools = true;
        //var cookie = require('saber-cookie');
        //document.cookie = 'ed=0';
        //cookie.remove('ed');
        // *************  DEV END  ************* //
    }

    var $ = require('zepto');
    require('jui');
    var u = require('underscore');

    var ajax = require('common/ajax');

    var config = require('config');
    var actions = require('vuex/actions');

    var api = ajax.createRequest(config.back);
    // 将转换后的api注入到config中，方便在Vue实例之外进行使用
    config.api = u.extend(config.api, api);

    var App = Vue.extend({
        store: require('vuex/store'),
        vuex: {
            getters: {
                user: function (state) {
                    return state.user.value;
                }
            },
            actions: {
                fetchUser: actions.fetchUser
            }
        },
        watch: {
            user: function (data) {
                // 已经顺利拿到了用户信息
                if (data.id) {
                    // 如果由openId，但是没有关注公众号，则引导到关注页面
                    api.checkWxSubscribe().then(function (data) {
                        if (data.isOpenid && !data.isSubscribe) {
                            router.go('/wx/subscribe');
                        }
                    });
                }
            }
        },
        ready: function () {
            this.fetchUser();
        }
    });

    var router = new VueRouter({
        history: true,
        transitionOnLoad: true,
        linkActiveClass: 'v-link-active active'
    });

    router.map(config.front);

    router.redirect({
        '*': '/404'
    });

    var preloaderTimer = null;
    router.beforeEach(function (transition) {
        clearTimeout(preloaderTimer);
        $.hidePreloader();
        var to = transition.to;
        // 设置默认首页
        if (to.path === '/' || /^\/(#|\?)\s*/.test(to.path)) {
            transition.redirect('/award/cash');
            return;
        }
        $.showPreloader('加载中…');
        preloaderTimer = setTimeout(function () {
            $.hidePreloader();
        }, 10 * 1000);
        transition.next();
    });

    router.afterEach(function (transition) {
        //var to = transition.to;
        $.hidePreloader();
        clearTimeout(preloaderTimer);
        preloaderTimer = null;
    });

    ajax.onauthfailed = function () {
        var path = router.app.$route.path;
        if (!/^\/(register|login)/g.test(path)) {
            router.replace('/login?url=' + encodeURIComponent(path));
        }
    };

    // 百度统计
    var baidu = require('common/baidu');
    if (consts.ENV === 'prod') {
        baidu.create({
            router: router,
            account: ''
        });
    }

    // 混合注入
    Vue.mixin({
        created: function () {
            this.$api = api;
        },
        data: function () {
            return {
                env: env,
                consts: consts
            };
        },
        methods: {
            back: function () {
                window.history.back(-1);  //根据需要可使用history.go(-1);
            }
        },
        components: {
            'ui-listview': require('ui/listview.vue'),
            'ui-lazyimage': require('ui/lazyimage.vue'),
            'ui-navbar': require('ui/navbar.vue'),
            'ui-tabbar': require('ui/tabbar.vue'),
            'ui-verifycode': require('ui/verifycode.vue'),
            'ui-voucher': require('ui/voucher.vue')
        }
    });

    return {
        init: function () {
            router.start(App, '#viewport')
        }
    };
});

// for *.vue files
define('vue-hot-reload-api', function () {});
define('vueify/lib/insert-css', function () {
    var inserted = {};
    return {
        insert: function (css) {
            if (inserted[css]) return;
            inserted[css] = true;
            var elem = document.createElement('style');
            elem.setAttribute('type', 'text/css');
            if ('textContent' in elem) {
                elem.textContent = css;
            }
            else {
                elem.styleSheet.cssText = css;
            }
            document.getElementsByTagName('head')[0].appendChild(elem);
            return elem;
        }
    };
});
