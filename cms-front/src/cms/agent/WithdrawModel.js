/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function AgentWithdrawModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.withdrawList;
    }


    /**
     * @inheritDoc
     */
    AgentWithdrawModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // AgentWithdrawModel.prototype.defaultTimeRange = batUtil.getTimeRange();


    AgentWithdrawModel.prototype.checkAgentWithdraw = function (e) {
        return api.checkAgentWithdraw({
            id: e.id,
            status: e.status
        });
    };
    /**
     * @inheritDoc
     */
    AgentWithdrawModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };


    // return模块
    require('er/util').inherits(AgentWithdrawModel, ListModel);
    return AgentWithdrawModel;
});
