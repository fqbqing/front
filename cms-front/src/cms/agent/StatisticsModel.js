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
    function AgentStatisticsModel() {
        BaseModel.apply(this, arguments);
    }

    AgentStatisticsModel.prototype.agentActivityStatistics = function(e){
        return api.agentActivityStatistics({
            pageSize: e.pageSize,
            pageNo: e.pageNo
        });
    };
    /**
     * @inheritDoc
     */
    AgentStatisticsModel.prototype.datasource = {
        agentStatistics: function (model) {
            return api.agentStatistics();
        },
        agentActivityStatistics: function (model) {
            return api.agentActivityStatistics();
        }
    };


    // return模块
    require('er/util').inherits(AgentStatisticsModel, BaseModel);
    return AgentStatisticsModel;
});
