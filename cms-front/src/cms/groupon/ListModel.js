/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
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
    function GrouponListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listGroupon;
    }


    /**
     * @inheritDoc
     */
    GrouponListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // GrouponListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    GrouponListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    GrouponListModel.prototype.deleteGroupon = function (id) {
        return api.deleteGroupon({
            id: id
        });
    };

    GrouponListModel.prototype.commitGroupon = function (e) {
        return api.commitGroupon({
            id: e.id,
            status: e.status
        });
    };

    // return模块
    require('er/util').inherits(GrouponListModel, ListModel);
    return GrouponListModel;
});
