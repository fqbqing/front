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
    function OrganizationStaffIndex() {
        BaseAction.apply(this, arguments);
    }

    OrganizationStaffIndex.prototype.modelType = require('./IndexModel');
    OrganizationStaffIndex.prototype.viewType = require('./IndexView');

    function forwardToPage(e) {
        var me = this;
        var query = {
            group_id: e.group_id,
            pageNo : e.page,
            pageSize : e.pageSize
        };
        return me.model.getStaff(query).then(function (page) {
            me.view.refresh(page);
        });
    }

    function getGroupStaff(e) {
        var me = this;
        return me.model.getGroupStaff({
            group_id: e.group_id
        }).then(function (page) {
            me.view.refresh(page);
        });
    }

    /**
     * @protected
     * @override
     */
    OrganizationStaffIndex.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('pageChange', forwardToPage, this);
        this.view.on('pageSizeChange', forwardToPage, this);
        this.view.on('getGroupStaff', getGroupStaff, this);

    };

    require('er/util').inherits(OrganizationStaffIndex, BaseAction);
    return OrganizationStaffIndex;
});
