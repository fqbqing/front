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
    function AccessUserRole() {
        BaseAction.apply(this, arguments);
    }

    AccessUserRole.prototype.modelType = require('./RoleModel');
    AccessUserRole.prototype.viewType = require('./RoleView');

    function saveRole() {
        var me = this;
        this.model.saveRole().then(function () {
            me.view.showToast('保存成功');
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
    AccessUserRole.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('saveRole', saveRole, this);
        this.view.on('pageSizeChange', forwardToPage, this);
    };

    require('er/util').inherits(AccessUserRole, BaseAction);
    return AccessUserRole;
});
