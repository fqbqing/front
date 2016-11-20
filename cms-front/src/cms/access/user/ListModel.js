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
    function AccessUserListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listAccessUser;
    }

    /**
     * @inheritDoc
     */
    AccessUserListModel.prototype.datasource = {

    };

    /**
     * @inheritDoc
     */
    // AccessUserListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    AccessUserListModel.prototype.defaultArgs = {
        order: 'desc',
/*        orderBy: 'id',*/
        pageSize: 15
    };

    AccessUserListModel.prototype.deleteUser = function (ids) {
        return api.deleteAccessUser({
            id: ids
        });
    };


    // return模块
    require('er/util').inherits(AccessUserListModel, ListModel);
    return AccessUserListModel;
});
