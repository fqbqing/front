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
    function AgentListModel() {
        ListModel.apply(this, arguments);
        // 列表请求器 (*)
         this.listRequester = api.agentList;
    }


    /**
     * @inheritDoc
     */
    AgentListModel.prototype.datasource = null;

    AgentListModel.prototype.updateAgentStatus = function (e) {
        return api.updateAgentStatus({
            agent_id: e.agent_id,
            status: e.status
        })
    };
    /**
     * @inheritDoc
     */
    // AgentListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    AgentListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };


    // return模块
    require('er/util').inherits(AgentListModel, ListModel);
    return AgentListModel;
});
