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
    function TuanAddModel() {
        FormModel.apply(this, arguments);
        // 表单提交请求器 (*)
        this.submitRequester = api.addTuan;
    }


    /**
     * @inheritDoc
     */
    TuanAddModel.prototype.datasource = {
        themes: function(){
            return cons.THEME_LIST;
        },
        exampleImg:  function(){
            return require.toUrl('common/img/example-1.png');
        }
    };
    /**
     * @inheritDoc
     */
    TuanAddModel.prototype.getExtraData = function () {
        return {
            type: 'base',
            image_default_id: this.get('formData').image_default_id,
            share_image_id: this.get('formData').share_image_id
        };
    };
    TuanAddModel.prototype.filterData = function(data) {
        delete data['character-title0'];
        delete data['character-title1'];
        delete data['character-content0'];
        delete data['character-content1'];
        data.share_image_id = data.share_image_id ? data.share_image_id : 0;
        data.is_coupon = data.is_coupon ? 1 : 0;
        return data;
        
    };

    /**
     * @inheritDoc
     */

    // return模块
    require('er/util').inherits(TuanAddModel, FormModel);
    return TuanAddModel;
});
