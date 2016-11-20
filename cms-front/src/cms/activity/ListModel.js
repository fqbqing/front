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
    function ActivityListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.listActivity;
    }


    /**
     * @inheritDoc
     */
    ActivityListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // ActivityListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    ActivityListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    ActivityListModel.prototype.deleteActivity = function (ids) {
        return api.deleteActivity({
            id: ids
        });
    };


    // return模块
    require('er/util').inherits(ActivityListModel, ListModel);
    return ActivityListModel;
});
