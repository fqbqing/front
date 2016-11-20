/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');
    var u = require('underscore');
    var user = require('bat-ria/system/user');
    var visitor = user.visitor;
    /**
     * Action构造函数
     *
     * @constructor
     */
    function AgentDetail() {
        BaseAction.apply(this, arguments);
    }

    AgentDetail.prototype.modelType = require('./DetailModel');
    AgentDetail.prototype.viewType = require('./DetailView');


    function distribute(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '分配销售对接人',
            width: 800,
            needFoot: true,
            url: '/access/user/chooser~group_id=' + visitor.organization.sale_group_id
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                var table = action.view.get('table');
                var items = table.getSelectedItems();
                if(items.length){
                    me.distributeAgent({
                        user_company_id: u.pluck(items,'id')[0] //选中的销售顾问ID
                    });
                }else{
                    me.view.alert({
                        title: '分配销售对接人',
                        content: '您还未选择销售对接人！'
                    });
                }

            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }
    AgentDetail.prototype.distributeAgent = function (e) {
        var me = this;
        return this.model.distribute({
            user_company_id: e.user_company_id
        }).then(function (result) {
            me.reload();
        });
    };


    function forwardToPage(e) {
        var me = this;
        var query = {
            pageNo : e.page,
            pageSize : e.pageSize
        };
        return me.model.getAgentIncomeList(query).then(function (page) {
            me.view.refresh(page);
        });
    }
    /**
     * @protected
     * @override
     */
    AgentDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('distribute', distribute, this);
        this.view.on('pageChange', forwardToPage, this);
        this.view.on('pageSizeChange', forwardToPage, this);
    };

    require('er/util').inherits(AgentDetail, BaseAction);
    return AgentDetail;
});
