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
    function TuanEditDescriptionModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        this.formRequester = api.getTuanById;

        // 表单提交请求器 (*)
        this.submitRequester = api.updateTuan;
    }


    /**
     * @inheritDoc
     */
    TuanEditDescriptionModel.prototype.datasource = {
        exampleImg:  function(){
            return require.toUrl('common/img/example-2.png');
        }
    };


    /**
     * @inheritDoc
     */
    TuanEditDescriptionModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    TuanEditDescriptionModel.prototype.getExtraData = function () {
        return {
            id: this.get('id'),
            type: 'description'
        };
    };
    TuanEditDescriptionModel.prototype.filterData = function(data) {
        data.tuan_time = moment(data.tuan_time).unix();
        data.end_time = moment(data.end_time).unix();
        return data;
    };
    // return模块
    require('er/util').inherits(TuanEditDescriptionModel, FormModel);
    return TuanEditDescriptionModel;
});
