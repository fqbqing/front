/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var moment = require('moment');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function TuanEditGiftModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        this.formRequester = api.getTuanById;

        // 表单提交请求器 (*)
        this.submitRequester = api.updateTuan;
    }


    /**
     * @inheritDoc
     */
    TuanEditGiftModel.prototype.datasource = {
        exampleImg:  function(){
            return require.toUrl('common/img/example-3.png');
        }
    };


    /**
     * @inheritDoc
     */
    TuanEditGiftModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };
    TuanEditGiftModel.prototype.getExtraData = function () {
        return {
            id: this.get('id'),
            type: 'gift'
        };
    };
    /**
     * @inheritDoc
     */
    TuanEditGiftModel.prototype.getExtraData = function () {
        return {
            id: this.get('id'),
            type: 'gift'
        };
    };
    TuanEditGiftModel.prototype.filterData = function(data) {
        delete data.title;
        delete data.content;
        return data;
    };

    // return模块
    require('er/util').inherits(TuanEditGiftModel, FormModel);
    return TuanEditGiftModel;
});
