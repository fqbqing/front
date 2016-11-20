/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function TuanEditProcessModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        this.formRequester = api.getTuanById;

        // 表单提交请求器 (*)
        this.submitRequester = api.updateTuan;
    }


    /**
     * @inheritDoc
     */
    TuanEditProcessModel.prototype.datasource = null;


    /**
     * @inheritDoc
     */
    TuanEditProcessModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    TuanEditProcessModel.prototype.getExtraData = function () {
        return {
            id: this.get('id'),
            type: 'process'
        };
    };
    TuanEditProcessModel.prototype.filterData = function(data) {
        delete data.title;
        delete data.content;
        delete data.refund;
        return data;
    };

    // return模块
    require('er/util').inherits(TuanEditProcessModel, FormModel);
    return TuanEditProcessModel;
});
