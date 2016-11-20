/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var utils = require('common/utils');
    var constants = require('common/constants');
    var user = require('bat-ria/system/user');
    require('esui/Tip');


    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AgentListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    AgentListView.prototype.template = 'TPL_agent_list';

    var tableFields = [
         {
             field: 'agent_name',
             title: '姓名',
             align: 'center',
             content: function (item) {
                 return item.agent ? item.agent.name : '-';
             }
         },
         {
             field: 'agent_phone',
             title: '手机',
             align: 'center',
             content: function (item) {
                 return item.agent ? item.agent.phone : '-';
             }
         },
         {
             field: 'owner_name',
             title: '销售对接人',
             align: 'center',
             tip: '通过该经纪人报名的客户由此销售对接人负责',
             content: function (item) {
                 return item.owner ? item.owner.name : '-';
             }
         },
        {
            field: 'total_income',
            title: '总现金收益（元）',
            align: 'center',
            content: function (item) {
                return utils.getAmount(item.total_income);
            }
        },
        {
            field: 'created_time',
            title: '录入时间',
            align: 'center',
            content: function (item) {
                return utils.dateFormat(item.created_time);
            }
        },
        {
            field: 'action',
            title: '操作',
            align: 'center',
            content: function (item) {
                var str = '';
                str += '<a href="#/agent/detail~id='+ item.agent_id +'">详情</a>';
                if (item.status == constants.AGENT_STATUS_VALID) {
                    if (user.isAllow('agent.update-status')) {
                        str += '<a href="javascript:void(0)" data-command="disableAgent" data-command-args="' + item.agent_id + ',' + item.status + '">禁用</a>';
                    }
                }
                else if (item.status == constants.AGENT_STATUS_FORBIDDEN) {
                    if (user.isAllow('agent.update-status')) {
                        str += '<a href="javascript:void(0)" data-command="enableAgent" data-command-args="'+ item.agent_id +','+ item.status +'">启用</a>';
                    }
                }
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    AgentListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true,
            select: 'multi'
        }

    };
    AgentListView.prototype.getExtraSearchArgs = function () {
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
    AgentListView.prototype.uiEvents = {
        'table:command':function (e) {
            var param = e.args.split(',');
            this.fire('updateAgentStatus', {
                agent_id: param[0],
                status: param[1] == constants.AGENT_STATUS_VALID ? constants.AGENT_STATUS_FORBIDDEN : constants.AGENT_STATUS_VALID
            });
        },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }

    };

    require('er/util').inherits(AgentListView, ListView);
    return AgentListView;
});
