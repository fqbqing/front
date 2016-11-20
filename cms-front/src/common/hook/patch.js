/**
 * Created by lifayu on 16/1/16.
 */
define(function (require) {

    var permission = require('er/permission');
    var u = require('underscore');
    /**
     * 用户信息相关补丁
     */
    var user = require('bat-ria/system/user');
    user.init = function (session) {
        if (session.visitor) {
            this.visitor = session.visitor;
        }
        if (!session.visitor) {
            this.visitor = session;
        }
        // 如果配置了权限信息，需要初始化 `er/permission`
        var auth = this.visitor.auth;
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

    user.isAllow = function (name) {
        return permission.isAllow(name);
    };

    var isAllow = permission.isAllow;
    /**
     * 重写权限判断逻辑，支持`或`(暂时不考虑`与`的情况)
     * @param name 权限名称
     * @return {boolean}
     */
    permission.isAllow = function (name) {
        return u.some(u.map(name.split('|'), function (item) {
            return isAllow(item);
        }));
    };

    /**
     * 列表页面扩展补丁
     */
    var ListView = require('bat-ria/mvc/ListView');

    /**
     * 触发搜索的时候添加form获取不到的内容
     * @return {Object}
     */
    ListView.prototype.getExtraSearchArgs = function () {
        return {};
    };
    /**
     * 收集查询参数并触发查询事件
     *
     * @param {mini-event.Event} e 控件事件对象
     */
    ListView.prototype.submitSearch = function (e) {
        var args = this.getSearchArgs();
        var extra = this.getExtraSearchArgs();
        args = u.extend(args, extra);

        // 如果是表格排序引发的，把新的排序放进去
        if (e.type === 'sort') {
            args.orderBy = e.field.field;
            args.order = e.order;
        }

        this.fire('search', {args: args});
    };
});