/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var utils = require('common/utils');
    require('esui/Tip');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationAgentListView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrganizationAgentListView.prototype.template = 'TPL_organization_agent_list';

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
            field: 'organization_name',
            title: '所属4S店',
            align: 'center',
            content: function (item) {
                if(this.organizationId){
                    return item.organization? item.organization.name : '-'
                }
                return item.organization? '<a href="#/organization/detail~organization_id='+item.organization_id+'">'+item.organization.name+'</a>' : '-'

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
        // {
        //     field: 'action',
        //     title: '操作',
        //     align: 'center',
        //     content: function (item) {
        //         var str = '';
        //         if (this.organizationId) {
        //             str += '<a href="#/organization/agent/deal/list~agent_id=' + item.agent_id + 'organization_id=' + this.organizationId + '">查看</a>';
        //         }
        //         else {
        //             str += '<a href="#/organization/agent/deal/list~agent_id='+ item.agent_id +'">查看</a>';
        //         }
        //         return str;
        //     }
        // }
    ];

    /**
     * @inheritDoc
     */
    OrganizationAgentListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true,
            organizationId: '@organization_id'

        }

    };
    OrganizationAgentListView.prototype.getExtraSearchArgs = function () {
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
    OrganizationAgentListView.prototype.uiEvents = {
        'searchbox:search': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(OrganizationAgentListView, ListView);
    return OrganizationAgentListView;
});
