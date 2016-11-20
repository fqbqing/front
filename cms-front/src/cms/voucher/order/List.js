/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function VoucherOrderList() {
        ListAction.apply(this, arguments);
    }

    VoucherOrderList.prototype.modelType = require('./ListModel');
    VoucherOrderList.prototype.viewType = require('./ListView');


    function checkOrder(e) {
        var me = this;
        me.view.waitConfirm({
            title: '订单核销',
            content: '确定要核销吗？',
            width: 300
        }).then(function () {
            me.model.voucherOrderCheckSale({
                cn: e.cn
            }).then(function () {
                me.reload();
            });
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
        var confirmText = '确定要为如下用户做线下退款吗？' +
                          '<p>姓名：'+ e.name +'</p>' +
                          '<p>手机号：'+ e.phone +'</p>' +
                          '<p>支付方式：'+ e.payment +'</p>' +
                          '<p>退款金额：'+ e.amount +'元</p>';
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
    /**
     * @protected
     * @override
     */
    VoucherOrderList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('checkOrder', checkOrder, this);
        this.view.on('refundOnline', refundOnline, this);
        this.view.on('refundOffline', refundOffline, this);

    };

    require('er/util').inherits(VoucherOrderList, ListAction);
    return VoucherOrderList;
});
