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
    function GoodListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.listGood;
    }


    /**
     * @inheritDoc
     */
    GoodListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // GoodListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    GoodListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    GoodListModel.prototype.deleteGood = function (ids) {
        return api.deleteGood({
            id: ids
        });
    };


    // return模块
    require('er/util').inherits(GoodListModel, ListModel);
    return GoodListModel;
});
