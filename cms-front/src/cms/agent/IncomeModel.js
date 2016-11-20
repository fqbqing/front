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
    function AgentIncomeModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.agentIncomeList;
    }


    /**
     * @inheritDoc
     */
    AgentIncomeModel.prototype.datasource = null;

    AgentIncomeModel.prototype.checkAgentIncome = function (e) {
        return api.checkAgentIncome({
            id: e.id,
            status: e.status
        });
    };

    /**
     * @inheritDoc
     */
    // AgentIncomeModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    AgentIncomeModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };
    AgentIncomeModel.prototype.prepareQuery = function (query) {
        if (query.award_type) {
            query.award_type = query.award_type.split(',');
        }
        return query;
    };

    // return模块
    require('er/util').inherits(AgentIncomeModel, ListModel);
    return AgentIncomeModel;
});
