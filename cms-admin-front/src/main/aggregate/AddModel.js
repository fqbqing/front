/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var cons = require('common/constants');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function AggregateAddModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        if(this.get('id')) {
            this.formRequester = api.getAdvertiseInfoById;
        }

        // 表单提交请求器 (*)
        if(this.get('id')) {
            this.submitRequester = api.updateAdvertise;
        }
        else {
            this.submitRequester = api.addAdvertise;
        }
    }


    /**
     * @inheritDoc
     */
    AggregateAddModel.prototype.datasource = {
        province: function () {
            return api.locationTree().then(function (data) {
                return data.children;

            })
        },
        ad_place: function () {
            return cons.AD_PLACE;
        },

        aggregate_channel: function () {
            return cons.AGGREGATE_CHANNEL;
        }


    };


    /**
     * @inheritDoc
     */
    AggregateAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    AggregateAddModel.prototype.getExtraData = function () {
        var param = {}
        if(this.get('id')){
            param.id = this.get('id');
        }
        return param;
    };

    AggregateAddModel.prototype.filterData = function(data) {
        data.image_id = this.get('formData').image_id;
        return data;
    };

    // return模块
    require('er/util').inherits(AggregateAddModel, FormModel);
    return AggregateAddModel;
});
