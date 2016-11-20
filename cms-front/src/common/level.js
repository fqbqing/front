/**
 * Created by lifayu on 16/4/7.
 */
define(function () {

    var u = require('underscore');

    var authorities = {};

    /**
     * @class permission
     *
     * 权限管理器，提供权限的注册和判断功能
     *
     * @singleton
     */
    var permission = {
        /**
         * 添加权限
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

    var level = {};

    /**
     * 初始化level
     *
     * @param {number} id 级别ID
     * @param {Object} auth 权限
     */
    level.init = function (id, auth) {
        level.id = id;
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
            permission.add(tmp);
        }
    };

    level.isAllow = function (name) {
        return permission.isAllow(name);
    };

    return level;
});