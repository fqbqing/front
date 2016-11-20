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
    function AccessRoleListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listRole;
    }


    /**
     * @inheritDoc
     */
    AccessRoleListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // AccessRoleListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    AccessRoleListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    AccessRoleListModel.prototype.addRole = function (name) {
        return api.addRole({
            name: name
        });
    };

    AccessRoleListModel.prototype.deleteRole = function (ids) {
        return api.deleteRole({
            id: ids
        });
    };

    // return模块
    require('er/util').inherits(AccessRoleListModel, ListModel);
    return AccessRoleListModel;
});
