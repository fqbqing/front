/**
 * Created by lifayu on 15/1/11.
 */
define(function (require) {

    var user = require('../user');
    var firework = require('saber-firework');

    var u = require('underscore');

    /**
     * 不需要登录保护的页面地址列表
     * @type {string[]}
     */
    var UN_PROTECTED_PAGE_LIST = [
        '/login',
        '/resetpassword'
    ];

    /**
     * 判断给定的页面地址是否是受保护的
     * @param {string} path 页面地址
     * @return {boolean}
     */
    function isPageProtected(path) {
        return u.indexOf(UN_PROTECTED_PAGE_LIST, path) === -1;
    }

    //firework.addFilter(/^\//, function (route, next, jump) {
    //    next();
    //});

    firework.addFilter(/^\//, function (route, next, jump) {
        //if (!user.isLogin && route.path !== '/login') {
        if (!user.isLogin && isPageProtected(route.path)) {
            // 没登录就乖乖去登录
            // 通过直接修改路由信息中的`path`来改变实际加载的页面
            // 同时添加名为`form`的`query`参数，用于登录完成后跳转回之前的页面
            route.query = {
                //url: route.path
                url: route.url || route.path
            };
            route.path = '/login';
            // 直接跳过后续的filter
            jump();
        }
        else if (user.userInfo.needPasswordChange) {
            // 如果需要强制修改密码，则调到修改密码页面
            route.path = '/my/changepwd';
            jump();
        }
        else {
            // 已经登录了
            // 就好好继续执行下一个filter吧
            next();
        }
    });
});