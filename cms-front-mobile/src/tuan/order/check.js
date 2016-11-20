/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {
        title: '订单核销'
    };

    exports.view = require('./checkView');

    exports.model = require('./checkModel');

    exports.events = {
        'view:CHECK_SALE': function (intention) {
            var me = this;
            me.model.checkSale({
                intention: intention
            }).then(function () {
                me.view.showTip('核销成功', 'success');
                me.router.reset('/');
            });
        }
    };

    return exports;
});
