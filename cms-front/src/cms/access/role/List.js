/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function AccessRoleList() {
        ListAction.apply(this, arguments);
    }

    AccessRoleList.prototype.modelType = require('./ListModel');
    AccessRoleList.prototype.viewType = require('./ListView');

    function deleteRole(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的角色吗？').then(function () {
                me.model.deleteRole(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的角色');
        }
    }

    function addRole(e) {
        var me = this;
        var name = e.name;
        if (name.length === 0) {
            me.view.alert('请填写角色名称');
            return;
        }
        me.model.addRole(name).then(function () {
            me.reload();
        });
    }


    /**
     * @protected
     * @override
     */
    AccessRoleList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('deleteRole', deleteRole, this);
        this.view.on('addRole', addRole, this);
    };

    require('er/util').inherits(AccessRoleList, ListAction);
    return AccessRoleList;
});
