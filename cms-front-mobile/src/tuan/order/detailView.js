/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.template = require('./detail.tpl.html');

	exports.templateMainTarget = 'TPL_tuan/order_detail';

    exports.domEvents = {
	};

    exports.events = {
    };

    exports.vueOptions = {
        methods: {
            updateOrder: function () {
                var me = this;
                this.$view.waitConfirm('确定要修改订单状态吗？').then(function () {
                    me.$view.emit('updateOrderStatus', me.order);
                });
            }
        }
    };

    return exports;
});

