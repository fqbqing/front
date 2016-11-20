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
    function AgentWithdraw() {
        ListAction.apply(this, arguments);
    }

    AgentWithdraw.prototype.modelType = require('./WithdrawModel');
    AgentWithdraw.prototype.viewType = require('./WithdrawView');


    function adopt(e) {
        var me = this;
        me.view.waitConfirm({
            title: '通过经纪人提现申请',
            width: 430,
            content: '确定通过经纪人提现申请？'
        }).then(function (event) {
            me.model.checkAgentWithdraw({
                id: e.id,
                status: constants.WITHDRAW_STATUS_WITHDREW
            }).then(function () {
                me.reload();
            })
        });

    }

    function reject(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '驳回经纪人提现申请',
            width: 430,
            needFoot: true,
            url: '/agent/check~type=withdraw',
            actionOptions: {
                id: e.id,
                status: constants.WITHDRAW_STATUS_REJECT
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
    AgentWithdraw.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('adopt', adopt, this);
        this.view.on('reject', reject, this);
    };

    require('er/util').inherits(AgentWithdraw, ListAction);
    return AgentWithdraw;
});
