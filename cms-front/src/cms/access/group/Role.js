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
    function AccessGroupRole() {
        BaseAction.apply(this, arguments);
    }

    AccessGroupRole.prototype.modelType = require('./RoleModel');
    AccessGroupRole.prototype.viewType = require('./RoleView');

    function saveRole() {
        var me = this;
        this.model.saveRole().then(function () {
            me.view.showToast('角色分配成功');
            me.fire('afterSaveRole');
        });
    }

    function forwardToPage(e) {
        var me = this;
        var query = {
            pageNo : e.page,
            pageSize : e.pageSize
        };
        return this.model.getRoleList(query).then(function (page) {
            me.view.refresh(page);
        });
    }
    /**
     * @protected
     * @override
     */
    AccessGroupRole.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('saveRole', saveRole, this);
        this.view.on('pageSizeChange', forwardToPage, this);
    };

    require('er/util').inherits(AccessGroupRole, BaseAction);
    return AccessGroupRole;
});
