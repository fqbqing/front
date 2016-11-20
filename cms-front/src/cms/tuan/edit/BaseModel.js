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
    function TuanEditBaseModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        this.formRequester = api.getTuanById;

        // 表单提交请求器 (*)
        this.submitRequester = api.updateTuan;
    }


    /**
     * @inheritDoc
     */
    TuanEditBaseModel.prototype.datasource = {
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
    TuanEditBaseModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };
    TuanEditBaseModel.prototype.getExtraData = function () {
        return {
            id: this.get('id'),
            type: 'base',
            image_default_id: this.get('formData').image_default_id,
            share_image_id: this.get('formData').share_image_id
        };
    };
    TuanEditBaseModel.prototype.filterData = function(data) {
        delete data['character-title0'];
        delete data['character-title1'];
        delete data['character-content0'];
        delete data['character-content1'];
        data.share_image_id = data.share_image_id ? data.share_image_id : 0;
        return data;
    };

    // return模块
    require('er/util').inherits(TuanEditBaseModel, FormModel);
    return TuanEditBaseModel;
});
