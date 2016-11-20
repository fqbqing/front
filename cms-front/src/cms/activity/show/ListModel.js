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
    function ActivityShowListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listActivityShow;
    }


    /**
     * @inheritDoc
     */
    ActivityShowListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // ActivityShowListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    ActivityShowListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };
    ActivityShowListModel.prototype.deleteActivityShow = function (ids) {
        return api.deleteActivityShow({
            id: ids
        });
    };

    // return模块
    require('er/util').inherits(ActivityShowListModel, ListModel);
    return ActivityShowListModel;
});
