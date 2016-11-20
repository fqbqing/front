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
    function OrderList() {
        ListAction.apply(this, arguments);
    }

    OrderList.prototype.modelType = require('./ListModel');
    OrderList.prototype.viewType = require('./ListView');

    function deleteOrder(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的订单吗？').then(function () {
                me.model.deleteOrder(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的订单');
        }
    }
    /**
     * @protected
     * @override
     */
    OrderList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('deleteOrder', deleteOrder, this);
    };

    require('er/util').inherits(OrderList, ListAction);
    return OrderList;
});
