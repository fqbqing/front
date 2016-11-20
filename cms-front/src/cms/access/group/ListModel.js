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
    function AccessGroupListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listAccessGroup;
    }


    /**
     * @inheritDoc
     */
    AccessGroupListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // AccessGroupListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    AccessGroupListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };
    AccessGroupListModel.prototype.deleteGroup = function (ids) {
        return api.deleteAccessGroup({
            id: ids
        });
    };

    // return模块
    require('er/util').inherits(AccessGroupListModel, ListModel);
    return AccessGroupListModel;
});
