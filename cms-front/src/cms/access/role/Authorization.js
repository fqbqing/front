/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function AccessRoleAuthorization() {
        BaseAction.apply(this, arguments);
    }

    AccessRoleAuthorization.prototype.modelType = require('./AuthorizationModel');
    AccessRoleAuthorization.prototype.viewType = require('./AuthorizationView');

    function updatePermissions(e) {
        var me = this;
        this.model.updatePermissions(e.permissions).then(function () {
            me.view.showToast('修改权限成功');
            me.back();
        });
    }
    function updateDataPermissions(e) {
        var me = this;
        this.model.updateDataPermissions(e.permissions).then(function () {
            me.view.showToast('数据权限修改成功');
            me.back();
        });
    }

    /**
     * @protected
     * @override
     */
    AccessRoleAuthorization.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('updatePermissions', updatePermissions, this);
        this.view.on('updateDataPermissions', updateDataPermissions, this);
    };

    require('er/util').inherits(AccessRoleAuthorization, BaseAction);
    return AccessRoleAuthorization;
});
