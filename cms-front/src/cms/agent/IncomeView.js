/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./income.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');
    var utils = require('common/utils');
    require('esui/Tip');
    var constants = require('common/constants');
    var user = require('bat-ria/system/user');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AgentIncomeView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    AgentIncomeView.prototype.template = 'TPL_agent_income';

    var tableFields = [
         {
             field: 'stage',
             title: '奖励阶段',
             align: 'center',
             content: function (item) {
                 return item.stage == constants.STAGE_SIGNUP ? '报名' : '成交';
             }
         },
         {
             field: 'activity_name',
             title: '活动',
             align: 'center',
             content: function(item){
                 return item.activity ? item.activity.name : '-';
             }
         },
         {
             field: 'customer_name',
             title: '客户姓名',
             align: 'center',
             content: function (item) {
                 return item.customer ? item.customer.name : '-';
             }
         },
        {
            field: 'customer_phone',
            title: '客户手机号',
            align: 'center',
            content: function (item) {
                return item.customer ? item.customer.phone : '-';
            }
        },
        {
            field: 'agent_name',
            title: '经纪人姓名',
            align: 'center',
            content: function (item) {
                return item.agent ? item.agent.name : '-';
            }
        },
        {
            field: 'agent_phone',
            title: '经纪人手机号',
            align: 'center',
            content: function (item) {
                return item.agent ? item.agent.phone : '-';
            }
        },
        {
            field: 'award_type',
            title: '奖励',
            align: 'center',
            content:  function (item) {
                //奖励类型，1表示现金，2表示优惠券
                switch (+item.award_type) {
                    case constants.AWARD_TYPE_CASH:
                        return '+' + utils.getAmount(item.amount)+'元';
                    case constants.AWARD_TYPE_VOUCHER:
                        return item.voucher ? '优惠券' + item.voucher.name : '-';
                    default:
                        return '-';

                }
                return '-';

            }
        },
        {
            field: 'created_time',
            title: '创建时间',
            stable: true,
            width: 140,
            align: 'center',
            content: function (item) {
                return utils.dateFormat(item.created_time);
            }
        },
        {
            field: 'status',
            title: '状态',
            align: 'center',
            content: function (item) {
                //状态，1表示未审核，2表示已通过，3表示已驳回
                switch (+item.status) {
                    case constants.AWARD_STATUS_NOT_AUDIT:
                        return '<span class="tuan-status tuan-status-offline">未审核</span>';
                    case constants.AWARD_STATUS_AUDITED:
                        return '<span class="tuan-status tuan-status-online">已通过</span>';
                    case constants.AWARD_STATUS_REFUSED:
                        return '<span class="tuan-status tuan-status-offline tuan-status-ajust">已驳回</span><div class="ui-tip ui-small" data-ui="type:Tip;layerWidth:110;content:'+ item.message +';"></div>';
                }
                return '-';
            }
        },
        {
            field: 'action',
            title: '操作',
            align: 'center',
            content: function (item,index) {
                var str = '';
                //状态，1表示未审核，2表示已通过，3表示已驳回
                if(item.status == constants.AWARD_STATUS_NOT_AUDIT ) {
                    if (user.isAllow('agent-income.audit')) {
                        str += '<a href="javascript:void(0)" data-command="adopt" data-command-args="'+ item.id +'">通过</a>';
                        str += '<a href="javascript:void(0)" data-command="reject" data-command-args="'+ item.id+'">驳回</a>';
                    }
                }
                else {
                    return '-'
                }
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    AgentIncomeView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true,
            columnRenderIndexes: [10]
        },
        awardType: {
            datasource: constants.AWARD_TYPE_LIST.slice(1)
        },
        awardStatus: {
            datasource: constants.AWARD_STATUS_LIST
        }

    };
    AgentIncomeView.prototype.getExtraSearchArgs = function () {
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
    AgentIncomeView.prototype.uiEvents = {
        'table:command': function (e) {
            if (e.name === 'adopt') {
                this.fire('adopt',{
                    id: e.args
                });
            }
            else if (e.name === 'reject') {
                this.fire('reject',{
                    id: e.args
                });
            }
        },
        'searchbox:search': function (e) {
            this.submitSearch(e);
        },
        'awardType:change': function (e) {
            this.submitSearch(e);
        },
        'awardStatus:change': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(AgentIncomeView, ListView);
    return AgentIncomeView;
});
