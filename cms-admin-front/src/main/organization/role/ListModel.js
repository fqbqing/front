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
    function OrganizationRoleListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listOrganizationRole;
    }


    /**
     * @inheritDoc
     */
    OrganizationRoleListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // OrganizationRoleListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    OrganizationRoleListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    OrganizationRoleListModel.prototype.addRole = function (name) {
        return api.addOrganizationRole({
            name: name
        });
    };

    OrganizationRoleListModel.prototype.deleteRole = function (ids) {
        return api.deleteOrganizationRole({
            id: ids
        });
    };

    // return模块
    require('er/util').inherits(OrganizationRoleListModel, ListModel);
    return OrganizationRoleListModel;
});
