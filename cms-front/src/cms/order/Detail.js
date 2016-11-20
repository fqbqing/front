/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function OrderDetail() {
        BaseAction.apply(this, arguments);
    }

    OrderDetail.prototype.modelType = require('./DetailModel');
    OrderDetail.prototype.viewType = require('./DetailView');

    function editOrder(e) {
        var me = this;
        var data = {
            order_id: e.order_id,
            status: e.status,
          /*  remark: e.remark*/
        };
        me.model.editOrder(data).then(function () {
            me.view.showToast('修改成功！');
            me.back("/order/list");
        });
    }

    function cancelEdit() {
        this.back();
    }

    /**
     * @protected
     * @override
     */
    OrderDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('editOrder', editOrder, this);
        this.view.on('cancel', cancelEdit, this);
    };

    require('er/util').inherits(OrderDetail, BaseAction);
    return OrderDetail;
});
