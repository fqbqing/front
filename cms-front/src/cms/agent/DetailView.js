/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./detail.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');
    var utils = require('common/utils');
    require('esui/Tip');
    var constants = require('common/constants');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AgentDetailView() {
        BaseView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    AgentDetailView.prototype.template = 'TPL_agent_detail';

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
            field: 'customer_name',
            title: '客户姓名',
            align: 'center',
            content: function (item) {
                return item.customer ? item.customer.name : '-';
            }
        },
        {
            field: 'customer_name',
            title: '客户手机号',
            align: 'center',
            content: function(item){
                return item.customer ? item.customer.phone : '-';
            }
        },
        {
            field: 'activity_name',
            title: '活动名称',
            stable: true,
            width: '120',
            align: 'center',
            content: function(item){
                return item.activity ? item.activity.name : '-';
            }
        },
        {
            field: 'created_time',
            title: '创建时间',
            align: 'center',
            content: function (item) {
                return utils.dateFormat(item.created_time);
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
                        return '<span class="tuan-status tuan-status-offline tuan-status-ajust">已驳回</span><div class="ui-tip ui-small" data-ui="type:Tip;content:'+ item.message +';"></div>';
                }
                return '-';
            }
        }
    ];


    /**
     * @inheritDoc
     */
    AgentDetailView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true,
            columnRenderIndexes: [7]

        }
    };

    /**
     * @inheritDoc
     */
    AgentDetailView.prototype.uiEvents = {
        'distributeBtn:click': function () {
            this.fire('distribute');
        },
        'pager:pagechange': function (e) {
            this.forwardToPage(e);

        },
        'pager:pagesizechange': function (e) {
            this.forwardToPage(e);
        }
    };

    AgentDetailView.prototype.forwardToPage = function (e) {
        var pager = this.get('pager');
        var page = e.target.get('page');
        var pageSize = e.target.get('pageSize');
        if(!pager.isDisabled()){
            this.fire('pageSizeChange', {page: page, pageSize: pageSize});
        }
    };
    /**
     * 根据Model数据重新渲染页面
     */
    AgentDetailView.prototype.refresh = function (data) {
        // 刷新列表
        this.refreshList(data);
    };

    /**
     * 根据Model数据重新渲染列表
     */
    AgentDetailView.prototype.refreshList = function (page) {
        var model = this.model;
        var table = this.get('Table');
        //table.disable();
        if (table) {
            table.setProperties(
                {
                    datasource: page
                }
            );
        }
        //table.enable();

        var pager = this.get('pager');
        pager.disable();
        if (pager) {
            pager.setProperties(
                {
                    count: page.totalCount,
                    page: page.pageNo,
                    pageSize: page.pageSize
                },
                {silent: true}
            );
        }
        pager.enable();
    };
    require('er/util').inherits(AgentDetailView, BaseView);
    return AgentDetailView;
});
