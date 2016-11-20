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
    function AgentRankModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.agentIncomeRank;
    }


    /**
     * @inheritDoc
     */
    AgentRankModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // AgentRankModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    AgentRankModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };


    // return模块
    require('er/util').inherits(AgentRankModel, ListModel);
    return AgentRankModel;
});
