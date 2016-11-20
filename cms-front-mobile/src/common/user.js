/**
 * Created by lifayu on 16/1/20.
 */
define(function (require) {

    var u = require('underscore');

    var authorities = {};

    var level = require('common/level');

    /**
     * @class permission
     *
     * 权限管理器，提供权限的注册和判断功能
     *
     * @singleton
     */
    var permssion = {
        /**
         * 添加权限
         *
         * 权限以字符串作为名称，添加权限说明时，传递一个对象，
         * 其中的健为权限名称，值为是否拥有该权限
         *
         * 权限说明可以嵌套，如：
         *
         *     {
             *         books: { VIEW_BOOK: true, EDIT_BOOK: false },
             *         authors: { VIEW_AUTHOR: true, EDIT_AUTHOR: true }
             *     }
         *
         * @param {Object} data 权限说明
         */
        add: function (data) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var value = data[key];
                    if (typeof value === 'object') {
                        this.add(value);
                    }
                    else {
                        authorities[key] = value;
                    }
                }
            }
        },

        /**
         * 判断是否拥有指定权限
         *
         * @param {string} name 权限名称
         * @return {boolean} 是否拥有`name`表示的权限
         */
        isAllow: function (name) {
            return u.some(u.map(name.split('|'), function (item) {
                return !!authorities[item];
            }));
        }
    };

    var user = {
        isLogin: false,
        userInfo: {}
    };

    user.init = function (session) {
        this.isLogin = true;
        this.userInfo = session;
        var auth = session.auth;
        if (auth) {
            var tmp = {};
            u.each(auth, function (item, ctrl) {
                var flag = false;
                u.each(item, function (enable, act) {
                    tmp[ctrl + '.' + act] = enable;
                    flag = flag || enable;
                });
                tmp[ctrl] = flag;
            });
            permssion.add(tmp);
        }
        level.init(session.levelAuth);
    };

    /**
     * 销毁用户信息
     */
    user.destroy = function () {
        this.isLogin = false;
        this.userInfo = {};
        authorities = {};
    };

    /**
     * 判断是否有指定的权限
     * @param {string} name 权限名称
     * @return {boolean}
     */
    user.isAllow = function (name) {
        return permssion.isAllow(name);
    };

    return user;
});