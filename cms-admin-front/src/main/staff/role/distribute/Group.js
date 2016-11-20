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
    function StaffRoleDistributeGroup() {
        BaseAction.apply(this, arguments);
    }

    StaffRoleDistributeGroup.prototype.modelType = require('./GroupModel');
    StaffRoleDistributeGroup.prototype.viewType = require('./GroupView');

    function saveRole() {
        var me = this;
        this.model.saveRole().then(function () {
            me.view.showToast('角色分配成功');
            me.fire('afterSaveRole');
        });
    }

    /**
     * @protected
     * @override
     */
    StaffRoleDistributeGroup.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('saveRole', saveRole, this);
    };

    require('er/util').inherits(StaffRoleDistributeGroup, BaseAction);
    return StaffRoleDistributeGroup;
});
