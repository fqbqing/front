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
    function TuanListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listTuan;
    }


    /**
     * @inheritDoc
     */
    TuanListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // TuanListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    TuanListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };


    TuanListModel.prototype.deleteTuan = function (ids) {
        return api.deleteTuan({
            id: ids
        });
    };
    TuanListModel.prototype.commitTuan = function (e) {
        return api.commitTuan({
            id: e.id,
            status: e.status
        });
    };

    TuanListModel.prototype.offlineAggregate = function (e) {
        return api.offlineAggregate({
            related_id: e.related_id,
            type: e.activity_type,
            online: e.online
        });
    };

    TuanListModel.prototype.onlineAggregate = function (e) {
        return api.onlineAggregate({
            related_id: e.related_id,
            type: e.activity_type,
            online: e.online
        });
    };
    TuanListModel.prototype.refreshAggregate = function (e) {
        return api.refreshAggregate({
            id: e.id
        });
    };

    TuanListModel.prototype.getFrequentLimit = function (e) {
        return api.getFrequentLimit({
            controller: 'aggregate',
            action: 'refresh',
            related_id: e.related_id
        });
    };
    // return模块
    require('er/util').inherits(TuanListModel, ListModel);
    return TuanListModel;
});
