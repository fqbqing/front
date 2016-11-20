/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {
        title: '订单详情'
    };

    exports.view = require('./detailView');

    exports.model = require('./detailModel');

    exports.events = {
        'view:updateOrderStatus': function (order) {
            var me = this;
            this.model.updateTuanOrder({
                id: order.id,
                status: order.status
            }).then(function () {
                me.view.showTip('修改成功', 'success');
            });
        }
    };

    return exports;
});
