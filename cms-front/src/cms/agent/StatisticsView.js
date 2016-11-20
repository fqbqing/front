/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./statistics.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');
    var utils = require('common/utils');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AgentStatisticsView() {
        BaseView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    AgentStatisticsView.prototype.template = 'TPL_agent_statistics';

    var tableFields = [
        {
            field: 'name',
            title: '活动名称',
            align: 'center',
            content: 'name'
        },
        {
            field: 'created_time',
            title: '活动时间',
            align: 'center',
            content: function(item){
                return utils.dateFormat(item.created_time);
            }
        },
        {
            field: 'signup_count',
            title: '经纪人客户报名数',
            stable: true,
            width: '120',
            align: 'center',
            content: function (item) {
                return item.agent_statistics ? item.agent_statistics.signup_count : '-';
            }
        },
        {
            field: 'deal_count',
            title: '经纪人客户成交数',
            align: 'center',
            content: function (item) {
                return item.agent_statistics ? item.agent_statistics.deal_count : '-';
            }
        },
        {
            field: 'agent_cost',
            title: '经纪人推广花费（元）',
            align: 'center',
            content:  function (item) {
                return item.agent_statistics ? utils.getAmount(item.agent_statistics.agent_cost) : '-';
            }
        }
    ];
    /**
     * @inheritDoc
     */
    AgentStatisticsView.prototype.uiProperties = {
        table: {
            fields: tableFields,
            sortable: true,
            columnResizable: true
        }
    };

    /**
     * @inheritDoc
     */
    AgentStatisticsView.prototype.uiEvents = {
        'pager:pagechange': function (e) {
            this.forwardToPage(e);

        },
        'pager:pagesizechange': function (e) {
            this.forwardToPage(e);
        }
    };

    AgentStatisticsView.prototype.forwardToPage = function (e) {
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
    AgentStatisticsView.prototype.refresh = function (data) {
        // 刷新列表
        this.refreshList(data);
    };

    /**
     * 根据Model数据重新渲染列表
     */
    AgentStatisticsView.prototype.refreshList = function (page) {
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
    require('er/util').inherits(AgentStatisticsView, BaseView);
    return AgentStatisticsView;
});
