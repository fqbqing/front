/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var u = require('underscore');


    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function VoucherActivityEditDescriptionModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        //this.formRequester = api.getVoucherActivityById;

        // 表单提交请求器 (*)
        this.submitRequester = api.updateVoucherActivity;

    }


    /**
     * @inheritDoc
     */
    VoucherActivityEditDescriptionModel.prototype.datasource = {
        exampleImg:  function(model){
            return require.toUrl('common/img/voucher_activity_2.png');
        },
        voucherActivityInfo: function (model) {
            return api.getVoucherActivityById({
                id: model.get('id'),
            }).then(function (data) {
                var images = [];
                if (data.images.length) {
                    u.each(data.images, function (item) {
                        images.push(u.pick(item,'image_url','slogan','description'));
                    });
                }
                data.images = images;
                return data;
            });
        }
    };


    /**
     * @inheritDoc
     */
    VoucherActivityEditDescriptionModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    VoucherActivityEditDescriptionModel.prototype.getExtraData = function () {
        return {
            id: this.get('id'),
            stage: 'activity'
        };
    };

    VoucherActivityEditDescriptionModel.prototype.filterData = function(data) {
        delete data.slogan;
        delete data.description;
        return data;
    };


    // return模块
    require('er/util').inherits(VoucherActivityEditDescriptionModel, FormModel);
    return VoucherActivityEditDescriptionModel;
});
