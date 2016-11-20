/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./detail.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrderDetailView() {
        BaseView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrderDetailView.prototype.template = 'TPL_order_detail';

    /**
     * @inheritDoc
     */
    OrderDetailView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    OrderDetailView.prototype.uiEvents = {
        'submit:click': function (e) {
            var orderId = this.model.get('order_id');
            var orderSt = this.get("orderStatus").getValue();
         /*   var remark = this.get("remarks").getValue();*/
            var data = {
                order_id: orderId,
                status: orderSt
             /*   remark: remark*/
            };
            this.fire('editOrder',data);
        },
        'cancel:click': function (e) {
            this.fire('cancel');
        }
    };

    require('er/util').inherits(OrderDetailView, BaseView);
    return OrderDetailView;
});
