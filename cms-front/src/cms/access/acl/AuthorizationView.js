/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./authorization.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');
    var u = require('underscore');
    var config = require('./config');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AccessAclAuthorizationView() {
        BaseView.apply(this, arguments);
    }

    AccessAclAuthorizationView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    AccessAclAuthorizationView.prototype.template = 'TPL_access_acl_authorization';

    /**
     * @inheritDoc
     */
    AccessAclAuthorizationView.prototype.uiProperties = {

    };

    AccessAclAuthorizationView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {},
            ready: function () {
                var vue = this;
                var permissions = vue.permissions;
                u.each(vue.ctrls, function (ctrl) {
                    if (permissions.user[ctrl.name]) {
                        u.each(ctrl.actions, function (act) {
                            act.checked = permissions.user[ctrl.name][act.name];
                        });
                    }
                    if (permissions.group[ctrl.name]) {
                        u.each(ctrl.actions, function (act) {
                            act.checked = act.checked || permissions.group[ctrl.name][act.name];
                            // 修改用户权限的时候，不能修改从组继承的权限
                            if (vue.id_type == config.ID_TYPE_USER && permissions.group[ctrl.name][act.name]) {
                                act.disabled = true;
                            }
                        });
                    }
                });
            },
            methods: {
                changeCtrl: function (ctrl, e) {
                    var el = e.target || e.srcElement;
                    ctrl.checked = el.checked;
                    u.each(ctrl.actions, function (act) {
                        act.checked = el.checked;
                    });
                },
                changeAct: function (ctrl, act, e) {
                    var el = e.target || e.srcElement;
                    act.checked = el.checked;
                    if (!el.checked) {
                        ctrl.checked = false;
                    }
                },
                save: function () {
                    me.fire('updatePermissions', {
                        permissions: me.getSelectedItems()
                    });
                }
            }
        };
    };

    AccessAclAuthorizationView.prototype.getSelectedItems = function () {
        var items = {};
        u.each(this.vue.ctrls, function (ctrl) {
            var actions = [];
            u.each(ctrl.actions, function (act) {
                if (act.checked && !act.disabled) {
                    actions.push(act.name);
                }
            });
            if (actions.length > 0) {
                items[ctrl.name] = actions;
            }
        });
        return items;
    };

    /**
     * @inheritDoc
     */
    AccessAclAuthorizationView.prototype.uiEvents = {};

    require('er/util').inherits(AccessAclAuthorizationView, BaseView);
    return AccessAclAuthorizationView;
});
