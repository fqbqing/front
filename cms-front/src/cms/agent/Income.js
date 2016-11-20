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
    function AgentIncome() {
        ListAction.apply(this, arguments);
    }

    AgentIncome.prototype.modelType = require('./IncomeModel');
    AgentIncome.prototype.viewType = require('./IncomeView');

    function adopt(e) {
        var me = this;
        me.view.waitConfirm({
            title: '通过经纪人收益申请',
            width: 430,
            content: '确定通过经纪人收益申请？'
        }).then(function (event) {
            me.model.checkAgentIncome({
                id: e.id,
                status: constants.AWARD_STATUS_AUDITED
            }).then(function () {
                me.reload();
            })
        });

    }

    function reject(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '驳回经纪人收益申请',
            width: 430,
            needFoot: true,
            url: '/agent/check~type=income',
            actionOptions: {
                id: e.id,
                status: constants.AWARD_STATUS_REFUSED
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            var action = dialog.getAction();
            action.redirectAfterSubmit = function () {
                dialog.dispose();
                me.reload();
            };
            dialog.getFoot().getChild('btnOk').on('click', function () {
                action.submitEdit();
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });

    }
    /**
     * @protected
     * @override
     */
    AgentIncome.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('adopt', adopt, this);
        this.view.on('reject', reject, this);


    };

    require('er/util').inherits(AgentIncome, ListAction);
    return AgentIncome;
});
