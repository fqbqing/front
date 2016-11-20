/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');
    var $ = require('jquery');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function OrganizationRefundList() {
        ListAction.apply(this, arguments);
    }

    OrganizationRefundList.prototype.modelType = require('./ListModel');
    OrganizationRefundList.prototype.viewType = require('./ListView');

    function deleteRefund(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的退款单吗？').then(function () {
                me.model.deleteRefund(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的退款单');
        }
    }

    function addRefund(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '新建退款单',
            width: 580,
            needFoot: true,
            url: '/organization/refund/add',
            actionOptions: {
               organization_id: this.model.get('organization_id')
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

    function aftercopy() {
        this.view.showToast('复制成功！');
    }
    /**
     * @protected
     * @override
     */
    OrganizationRefundList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('deleteRefund', deleteRefund, this);
        this.view.on('addRefund', addRefund, this);
        this.view.on('aftercopy', aftercopy, this);
    };

    require('er/util').inherits(OrganizationRefundList, ListAction);
    return OrganizationRefundList;
});
