/**
 * @file 
 * @author ()
 */

define(function (require) {

    var u = require('underscore');
    var config = {};

    config.view = require('./listView');

    config.model = require('./listModel');

    config.events = {
        'view:showOrderDetail': function (e) {
            this.redirect('/order/detail', {
                id: e.order_id
            });
        },
        'view:search': function (params) {
            var me = this;
            this.redirect('/order/list', params, {
                noCache: true
            });
        },
        'view:loadMoreOrder': function () {
            var me = this;
            this.model.listOrder().then(function (data) {
                var list = me.view.vm.orders;
                u.each(data, function (item) {
                    list.push(item);
                });
                me.view.vm.loading = false;
            });
        }
    };

    return config;
});
