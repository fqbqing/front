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
    function OrderTuanDetailView() {
        BaseView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrderTuanDetailView.prototype.template = 'TPL_order_tuan_detail';

    /**
     * @inheritDoc
     */
    OrderTuanDetailView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    OrderTuanDetailView.prototype.uiEvents = {
        'submit:click': function (e) {
            var orderId = this.model.get('order_id');
            var orderSt = this.get('orderStatus').getValue();
          /*  var remark = this.get("remarks").getValue();*/
            var data = {
                order_id: orderId,
                status: orderSt
            };
            this.fire('updateTuanOrder',data);
        },
        'cancel:click': function (e) {
            this.fire('cancel');
        }
    };
    require('er/util').inherits(OrderTuanDetailView, BaseView);
    return OrderTuanDetailView;
});
