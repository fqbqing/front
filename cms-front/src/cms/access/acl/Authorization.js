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
    function AccessAclAuthorization() {
        BaseAction.apply(this, arguments);
    }

    AccessAclAuthorization.prototype.modelType = require('./AuthorizationModel');
    AccessAclAuthorization.prototype.viewType = require('./AuthorizationView');

    function updatePermissions(e) {
        var me = this;
        this.model.updatePermissions(e.permissions).then(function () {
            me.view.showToast('修改权限成功');
            me.back();
        });
    }

    /**
     * @protected
     * @override
     */
    AccessAclAuthorization.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('updatePermissions', updatePermissions, this);
    };

    require('er/util').inherits(AccessAclAuthorization, BaseAction);
    return AccessAclAuthorization;
});
