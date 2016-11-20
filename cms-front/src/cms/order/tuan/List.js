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
    function OrderTuanList() {
        ListAction.apply(this, arguments);
    }

    OrderTuanList.prototype.modelType = require('./ListModel');
    OrderTuanList.prototype.viewType = require('./ListView');

    function checkSale(e) {
        var me = this;
        me.model.checkSale({
            cn: e.cn
        }).then(function(){
            me.reload();
            me.view.showToast('核销成功！');
        });
    }
    function refund(e) {
        var me = this;
        me.view.waitConfirm({
            title: '订单退款',
            content: '确定要退款吗？',
            width: 300
        }).then(function () {
            me.model.refund({
                order_id: e.order_id
            }).then(function(data){
                if(data === 'success'){
                    me.reload();
                    me.view.showToast("退款成功!");
                }else{
                    window.open(data);
                    me.view.showToast('如果浏览器拦截了弹出窗口，请手动允许窗口弹出');
                }
            });
        });
    }

    function checkOrder(e) {
        var me = this;
        me.view.waitActionDialog({
            title: e.checkType === 'deal' ? '标记为已购车' : '核销订单',
            width: 430,
            needFoot: true,
            url: '/order/tuan/check',
            actionOptions: {
                orderId: e.orderId,
                checkType: e.checkType
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
    OrderTuanList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);
        // bind event handlers here
        this.view.on('checkSale', checkSale, this);
        this.view.on('refund', refund, this);
        this.view.on('CHECK_ORDER', checkOrder, this);
    };

    require('er/util').inherits(OrderTuanList, ListAction);
    return OrderTuanList;
});
