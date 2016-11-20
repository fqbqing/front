/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./rank.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var utils = require('common/utils');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AgentRankView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    AgentRankView.prototype.template = 'TPL_agent_rank';

    var tableFields = [
         {
             field: 'index',
             title: '排名',
             align: 'center',
             stable: true,
             width: 80,
             content: function (item, index) {
                 return index + 1;
             }
         },
         {
             field: 'agent_name',
             title: '姓名',
             align: 'center',
             content: function (item) {
                 return item.agentInfo && item.agentInfo.agent ? item.agentInfo.agent.name : '-';
             }
         },
         {
             field: 'agent_phone',
             title: '手机号',
             align: 'center',
             content: function (item) {
                 return item.agentInfo && item.agentInfo.agent ? item.agentInfo.agent.phone : '-';
             }
         },
         {
             field: 'signup_count',
             title: '经纪人客户报名数',
             align: 'center',
             content: function (item) {
                 return item.statistics ? item.statistics.signup_count : '-';
             }
         },
         {
             field: 'deal_count',
             title: '经纪人客户成交数',
             align: 'center',
             content: function (item) {
                 return item.statistics ? item.statistics.deal_count : '-';
             }
         },
         {
             field: 'total_income',
             title: '收益（元）',
             align: 'center',
             content: function (item) {
                return utils.getAmount(item.total_income);
             }
         }
    ];

    /**
     * @inheritDoc
     */
    AgentRankView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true
        }
    };

    AgentRankView.prototype.getExtraSearchArgs = function () {
        var args = {};
        var phone = this.get('searchbox').getValue();
        if (phone) {
            args.phone = phone;
        }
        return args;
    };

    /**
     * @inheritDoc
     */
    AgentRankView.prototype.uiEvents = {
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(AgentRankView, ListView);
    return AgentRankView;
});
