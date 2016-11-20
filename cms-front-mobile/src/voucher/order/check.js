/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var exports = {};

    exports.view = require('./checkView');

    exports.model = require('./checkModel');

    exports.events = {
        'view:CHECK_SALE': function (intention) {
            var me = this;
            me.view.waitConfirm('确定要核销该订单吗？').then(function () {
                me.model.checkSale().then(function () {
                    me.view.showTip('核销成功', 'success');
                    me.router.reset('/');
                });
            });
        }
    };

    return exports;
});
