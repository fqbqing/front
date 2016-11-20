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
    function TuanEditSignupModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        this.formRequester = api.getTuanById;

        // 表单提交请求器 (*)
        this.submitRequester = api.updateTuan;
    }


    /**
     * @inheritDoc
     */
    TuanEditSignupModel.prototype.datasource = {
        carBuyWay: function(){
            return cons.CAR_BUYING_WAY
        },
        exampleImg:  function(){
            return require.toUrl('common/img/example-4.png');
        }
    };


    /**
     * @inheritDoc
     */
    TuanEditSignupModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    TuanEditSignupModel.prototype.getExtraData = function () {
        return {
            id: this.get('id'),
            type: 'signup'
        };
    };
    TuanEditSignupModel.prototype.filterData = function(data) {
        delete data.intentionValue;
        delete data.buyWay;
        return data;
    };
    // return模块
    require('er/util').inherits(TuanEditSignupModel, FormModel);
    return TuanEditSignupModel;
});
