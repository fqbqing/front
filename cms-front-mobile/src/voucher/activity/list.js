/**
 * @file
 * @author ()
 */

define(function (require) {

    var u = require('underscore');
    var exports = {
        title: '活动列表'
    };

    exports.view = require('./listView');

    exports.model = require('./listModel');

    exports.events = {
        'view:search': function (params) {
            var me = this;
            this.router.reset('/voucher/activity/list', params, {
                noCache: true
            });
        },
        'view:loadMore': function () {
            var me = this;
            this.model.listVoucherActivity().then(function (data) {
                var list = me.view.vm.voucher_activitys;
                u.each(data, function (item) {
                    list.push(item);
                });
                me.view.vm.loading = false;
            });
        }
    };

    return exports;
});
