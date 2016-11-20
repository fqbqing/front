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
    function AggregateAdModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.advertiseList;
    }


    /**
     * @inheritDoc
     */
    AggregateAdModel.prototype.datasource = {
        province: function () {
            return api.locationTree().then(function (data) {
                return data.children;

            })
        },
        ad_place: function () {
            return cons.AD_PLACE;
        }

    };

    AggregateAdModel.prototype.deleteAdvertise = function (id) {
        return api.deleteAdvertise({
            id: id
        });
    };

    /**
     * @inheritDoc
     */
    // AggregateAdModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    AggregateAdModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15,
        province_id: 2,
        place: 1,
        platform: 1
    };


    // return模块
    require('er/util').inherits(AggregateAdModel, ListModel);
    return AggregateAdModel;
});
