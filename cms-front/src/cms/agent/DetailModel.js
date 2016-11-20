/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function AgentDetailModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    AgentDetailModel.prototype.datasource = {
        agentInfo: function (model) {
            return api.getAgentInfoById({
                agent_id: model.get('id')
            })
        },
        agentIncomeList: function (model) {
            return api.agentIncomeList({
                agent_id: model.get('id')
            });
        }
    };
    AgentDetailModel.prototype.getAgentIncomeList = function(e){
        return api.agentIncomeList({
            agent_id: this.get('id'),
            pageSize: e.pageSize,
            pageNo: e.pageNo
        });
    };

    AgentDetailModel.prototype.distribute = function (e) {
        return api.distributeAgent({
            agent_id: this.get('id'),
            user_company_id: e.user_company_id
        });
    };
    // return模块
    require('er/util').inherits(AgentDetailModel, BaseModel);
    return AgentDetailModel;
});
