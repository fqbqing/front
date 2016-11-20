/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');
    var constants = require('common/constants');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function AgentList() {
        ListAction.apply(this, arguments);
    }

    AgentList.prototype.modelType = require('./ListModel');
    AgentList.prototype.viewType = require('./ListView');

    function updateAgentStatus(e) {
        var me = this;
        var title = '';
        var content = '';
        if(e.status == constants.AGENT_STATUS_VALID){
            title = '启用经纪人';
            content = '确定启用该经纪人吗？';
        }
        else if (e.status == constants.AGENT_STATUS_FORBIDDEN) {
            title = '禁用经纪人';
            content = '确定禁用该经纪人吗？';
        }
        me.view.waitConfirm({
            title: title,
            content: content
        }).then(function () {
            me.model.updateAgentStatus({
                agent_id: e.agent_id,
                status: e.status
            }).then(function () {
                me.reload();
            });
        });
    }

    /**
     * @protected
     * @override
     */
    AgentList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);
        // bind event handlers here
        this.view.on('updateAgentStatus', updateAgentStatus, this);
    };

    require('er/util').inherits(AgentList, ListAction);
    return AgentList;
});
