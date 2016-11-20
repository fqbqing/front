/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./withdraw.tpl.html');

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
    function AgentWithdrawView() {
        ListView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    AgentWithdrawView.prototype.template = 'TPL_agent_withdraw';

    var tableFields = [
         {
             field: 'name',
             title: '姓名',
             align: 'center',
             content: function (item) {
                 return item.agent ? item.agent.name : '-';
             }
         },
         {
             field: 'phone',
             title: '手机号',
             align: 'center',
             content: function (item) {
                 return item.agent ? item.agent.phone : '-';
             }
         },
         {
             field: 'amount',
             title: '金额（元）',
             align: 'center',
             content: function (item) {
                return utils.getAmount(item.amount);
             }
         },
         {
             field: 'created_time',
             title: '申请时间',
             align: 'center',
             content: function (item) {
                return utils.dateFormat(item.created_time);
             }
         },
         {
             field: 'remark',
             title: '备注',
             align: 'center',
             content: 'remark'
         },
         {
             field: 'status',
             title: '状态',
             align: 'center',
             content: function (item) {
                //状态，1表示未审核，2表示已通过，3表示已驳回
                switch (+item.status) {
                    case constants.WITHDRAW_STATUS_WITHDRAWING:
                        return '<span class="tuan-status tuan-status-offline">未提现</span>';
                    case constants.WITHDRAW_STATUS_WITHDREW:
                        return '<span class="tuan-status tuan-status-online">已提现</span>';
                    case constants.WITHDRAW_STATUS_REJECT:
                        return '<span class="tuan-status tuan-status-offline tuan-status-ajust">已驳回</span><div class="ui-tip ui-small" data-ui="type:Tip;layerWidth:110;content:'+ item.message +';"></div>';
                }
                return '-';
            }
         },
         {
             field: 'action',
             title: '操作',
             align: 'center',
             content: function (item) {
                var str = '';
                 if(item.status == constants.WITHDRAW_STATUS_WITHDRAWING) {
                     if (user.isAllow('agent-cash-withdraw.confirm')) {
                         str += '<a href="javascript:void(0)" data-command="adopt" data-command-args="' + item.id + '">确认提现</a>';
                         str += '<a href="javascript:void(0)" data-command="reject" data-command-args="' + item.id + '">驳回</a>';
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
    AgentWithdrawView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true,
            columnRenderIndexes: [8]
        },
        withdrawStatus: {
            datasource: constants.WITHDRAW_STATUS_LIST
        }

    };
    AgentWithdrawView.prototype.getExtraSearchArgs = function () {
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
    AgentWithdrawView.prototype.uiEvents = {
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
        'withdrawStatus:change': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(AgentWithdrawView, ListView);
    return AgentWithdrawView;
});
