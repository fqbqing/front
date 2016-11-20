/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var cons = require('common/constants');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function AggregateIndexModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.aggregateList;
    }


    /**
     * @inheritDoc
     */
    AggregateIndexModel.prototype.datasource = {
        province: function () {
            return api.locationTree().then(function (data) {
                return data.children;

            });
        },
        activity_type: function () {
            return cons.AGGREGATE_TYPE;
        },
        type: function (model) {
            return model.get('type') ? model.get('type') : 2
        }
    };


    AggregateIndexModel.prototype.updateOnline = function (e) {
        return api.updateAggregate({
            id: e.id,
            online: e.online
        }).then(function (data) {
            return data.children;

        });

    };

    AggregateIndexModel.prototype.updateWeight = function (e) {
        return api.updateAggregate({
            id: e.id,
            weight: e.weight
        });

    };

    /**
     * @inheritDoc
     */
    // AggregateIndexModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    AggregateIndexModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15,
        province_id: 2,
        type: 2
    };


    // return模块
    require('er/util').inherits(AggregateIndexModel, ListModel);
    return AggregateIndexModel;
});
