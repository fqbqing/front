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
    function OrderTuanDetail() {
        BaseAction.apply(this, arguments);
    }

    OrderTuanDetail.prototype.modelType = require('./DetailModel');
    OrderTuanDetail.prototype.viewType = require('./DetailView');

    function updateTuanOrder(e) {
        var me = this;
        var data = {
            order_id: e.order_id,
            status: e.status
          /*  remark: e.remark*/
        };
        me.model.updateTuanOrder(data).then(function () {
            me.view.showToast('修改成功！');
            //me.redirect("/order/tuan/list");
            me.back('/order/tuan/list');
        });
    }

    function cancelEdit() {
        this.back();
    }

    /**
     * @protected
     * @override
     */
    OrderTuanDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);
        // bind event handlers here
        this.view.on('updateTuanOrder', updateTuanOrder, this);
        this.view.on('cancel', cancelEdit, this);
    };

    require('er/util').inherits(OrderTuanDetail, BaseAction);
    return OrderTuanDetail;
});
