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
    function AgentCheckModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        // this.formRequester = api.someDetail;

        // 表单提交请求器 (*)
        if (this.get('type') =='withdraw') {
            this.submitRequester = api.checkAgentWithdraw;
        }
        else if (this.get('type') =='income') {
            this.submitRequester = api.checkAgentIncome;
        }
    }


    /**
     * @inheritDoc
     */
    AgentCheckModel.prototype.datasource = null;


    /**
     * @inheritDoc
     */
    AgentCheckModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    AgentCheckModel.prototype.getExtraData = function () {
        return {
            id: this.get('id'),
            status: this.get('status')
        };
    };

    // return模块
    require('er/util').inherits(AgentCheckModel, FormModel);
    return AgentCheckModel;
});
