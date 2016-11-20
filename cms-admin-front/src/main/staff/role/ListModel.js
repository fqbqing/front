/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function StaffRoleListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listStaffRole;
    }


    /**
     * @inheritDoc
     */
    StaffRoleListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // StaffRoleListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    StaffRoleListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };


    StaffRoleListModel.prototype.addRole = function (name) {
        return api.addStaffRole({
            name: name
        });
    };

    StaffRoleListModel.prototype.deleteRole = function (ids) {
        return api.deleteStaffRole({
            id: ids
        });
    };

    // return模块
    require('er/util').inherits(StaffRoleListModel, ListModel);
    return StaffRoleListModel;
});
