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
    function OrganizationRoleList() {
        ListAction.apply(this, arguments);
    }

    OrganizationRoleList.prototype.modelType = require('./ListModel');
    OrganizationRoleList.prototype.viewType = require('./ListView');

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



    function updateRole(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '修改角色',
            width: 500,
            needFoot: true,
            url: '/organization/role/add~id='+ e.ids.join(','),
            actionOptions: {
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            var action = dialog.getAction();
            action.on('aftersubmit', function (e) {
                me.reload();
                dialog.dispose();
            });
            dialog.getFoot().getChild('btnOk').on('click', function () {
                action.submitEdit();
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }

    function addRole(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '添加角色',
            width: 500,
            needFoot: true,
            url: '/organization/role/add',
            actionOptions: {
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            var action = dialog.getAction();
            action.on('aftersubmit', function (e) {
                me.reload();
                dialog.dispose();
            });
            dialog.getFoot().getChild('btnOk').on('click', function () {
                action.submitEdit();
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }

    /**
     * @protected
     * @override
     */
    OrganizationRoleList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('deleteRole', deleteRole, this);
        this.view.on('updateRole', updateRole, this);
        this.view.on('addRole', addRole, this);
    };

    require('er/util').inherits(OrganizationRoleList, ListAction);
    return OrganizationRoleList;
});
