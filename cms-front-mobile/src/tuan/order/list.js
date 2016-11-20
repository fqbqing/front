/**
 * @file 
 * @author ()
 */

define(function (require) {

    var u = require('underscore');
    var exports = {
        title: '活动订单'
    };

    exports.view = require('./listView');

    exports.model = require('./listModel');

    exports.events = {
        'view:FETCH_CUSTOMER_TRACK': function (order) {
            var me = this;
            me.model.getLastestCustomerTrack(order.customer.id).then(function (data) {
                order.lastestTrack = data || {
                        content: '无'
                    };
            });
        }
    };

    return exports;
});
