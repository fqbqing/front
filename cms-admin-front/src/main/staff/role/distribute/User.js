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
    function StaffRoleDistributeUser() {
        BaseAction.apply(this, arguments);
    }

    StaffRoleDistributeUser.prototype.modelType = require('./UserModel');
    StaffRoleDistributeUser.prototype.viewType = require('./UserView');


    function saveRole() {
        var me = this;
        this.model.saveRole().then(function () {
            me.view.showToast('保存成功');
            me.fire('afterSaveRole');
        });
    }

    /**
     * @protected
     * @override
     */
    StaffRoleDistributeUser.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('saveRole', saveRole, this);
    };

    require('er/util').inherits(StaffRoleDistributeUser, BaseAction);
    return StaffRoleDistributeUser;
});
