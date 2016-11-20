/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    var etpl = require('etpl');
    var $ = require('jquery');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function GrouponSignupList() {
        ListAction.apply(this, arguments);
    }

    GrouponSignupList.prototype.modelType = require('./ListModel');
    GrouponSignupList.prototype.viewType = require('./ListView');

    function checkOrder() {
        var me = this;
        this.view.showDialog({
            title: '订单核销',
            needFoot: true,
            width: 400,
            content: etpl.render('TPL_groupon_signup_list_checksale'),
            onOk: function () {
                var code = $('.check-cn', this.main).val();
                code = $.trim(code);
                if (!code) {
                    me.view.waitAlert('核销码不能为空');
                    return false;
                }
                me.model.checkSale(code).then(function () {
                    me.reload();
                });
                return true;
            }
        });
    }

    function refundOnline(e) {
        var order_ids = e.order_ids;
        var me = this;
        if (order_ids.length > 0) {
            me.view.waitConfirm({
                title: '线上退款',
                content: '确定线上退款吗？',
                width: 300
            }).then(function () {
                var newWindow = window.open('about:blank');
                me.model.refundOnline(order_ids.join(',')).then(function (data) {
                    if (data.url) {
                        newWindow.location.href = data.url;
                    }
                }, function () {
                    newWindow.close();
                });
            });
        }
        else {
            this.view.alert('请选择要退款的订单！');
        }
    }

    function refundOffline(e) {
        var me = this;
        var confirmText = '确定要为该用户线下退款吗？';
        if (e.order_id) {
            me.view.waitConfirm({
                title: '线下退款',
                content: confirmText,
                width: 350
            }).then(function () {
                me.model.refundOffline(e.order_id).then(function (data) {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要退款的订单！');
        }
    }

    function makeDeal(e) {
        var me = this;
        me.view.waitConfirm({
            title: '标记成交',
            content: '确认标记为已成交?'
        }).then(function () {
            me.model.makeDeal({
                id: e.id
            }).then(function () {
                me.reload();
            });
        });

    }

    /**
     * @protected
     * @override
     */
    GrouponSignupList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('CHECK_ORDER', checkOrder, this);
        this.view.on('makeDeal', makeDeal, this);
        this.view.on('refundOnline', refundOnline, this);
        this.view.on('refundOffline', refundOffline, this);
    };

    require('er/util').inherits(GrouponSignupList, ListAction);
    return GrouponSignupList;
});
