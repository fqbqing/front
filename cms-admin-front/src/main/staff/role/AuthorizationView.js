/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./authorization.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');
    var u = require('underscore');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function StaffRoleAuthorizationView() {
        BaseView.apply(this, arguments);
    }

    StaffRoleAuthorizationView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    StaffRoleAuthorizationView.prototype.template = 'TPL_staff_role_authorization';

    /**
     * @inheritDoc
     */
    StaffRoleAuthorizationView.prototype.uiProperties = {

    };


    StaffRoleAuthorizationView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {},
            ready: function () {
                var vue = this;
                var permissions = vue.permissions;
                u.each(vue.ctrls, function (ctrl) {
                    if (permissions[ctrl.name]) {
                        u.each(ctrl.actions, function (act) {
                            act.checked = permissions[ctrl.name][act.name];
                        });
                    }
                });
                var test = vue.allDataPermissions;
                vue.allDataPermissions = [];
                for(item in test){
                    vue.allDataPermissions.push({text:test[item],value:item})
                }
                u.each(vue.allDataPermissions, function (ele) {
                    u.each(vue.dataPermissions, function (value) {
                        if(ele.value == value){
                            ele.checked = true;
                        }
                    });
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
                changeDataAccess: function (item, e) {
                    var el = e.target || e.srcElement;
                    item.checked = el.checked;
                    if (!el.checked) {
                        item.checked = false;
                    }
                },
                save: function () {
                    me.fire('updatePermissions', {
                        permissions: me.getSelectedItems()
                    });
                },
                saveDataAccess: function(){
                    var vue = this;
                    var data = [];
                    u.each(vue.allDataPermissions, function (ele) {
                        if (ele.checked) {
                            data.push(ele.value)
                        }
                    });
                    me.fire('updateDataPermissions', {
                        permissions: data.join(',')
                    });
                }
            }
        };
    };

    StaffRoleAuthorizationView.prototype.getSelectedItems = function () {
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
    StaffRoleAuthorizationView.prototype.uiEvents = {};

    require('er/util').inherits(StaffRoleAuthorizationView, BaseView);
    return StaffRoleAuthorizationView;
});
