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
    function ActivityGoodListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listActivityGood;
    }

    /**
     * @inheritDoc
     */
    ActivityGoodListModel.prototype.datasource = {
        activity: function (model) {
            return api.getActivityById({
                id: model.get('activity_id')
            });
        }
    };

    /**
     * 添加活动关联的商品
     * @param ids
     * @return {Promise}
     */
    ActivityGoodListModel.prototype.addActivityGood = function (ids, type) {
        return api.addActivityGood({
            activity_id: this.get('activity_id'),
            type: type,
            action: '1',
            related_ids: ids.join(',')
        });
    };

    /**
     * 删除活动关联的商品
     * @param ids
     * @return {Promise}
     */
    ActivityGoodListModel.prototype.deleteActivityGood = function (ids) {
        return api.deleteActivityGood({
            ids: ids.join(',')
        });
    };

    /**
     * @inheritDoc
     */
    ActivityGoodListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    // return模块
    require('er/util').inherits(ActivityGoodListModel, ListModel);
    return ActivityGoodListModel;
});
