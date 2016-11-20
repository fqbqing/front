/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var exports = {
        title: '报名列表'
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

