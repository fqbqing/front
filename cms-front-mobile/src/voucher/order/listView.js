/**
 * @file 
 * @author ()
 */

define(function (require) {

    var u = require('underscore');
    var Vue = require('vue');
    var exports = {};

    exports.template = require('./list.tpl.html');

	exports.templateMainTarget = 'TPL_voucher/order_list';

    exports.domEvents = {
	};

    exports.events = {
        ready: function () {
        },
        revived: function  () {
        },
        sleep: function () {
        },
        leave: function () {
        }
    };

    exports.vueOptions = {
        data: {
            status: '',
            totalCount: 0,
            orders: []
        },
        methods: {

        },
        events: {
            search: function (searchbox, keywords) {
                this.$refs.listview.filter({
                    phone: keywords
                });
            },
            prepareListViewData: function (listview, data) {
                u.each(data, function (item) {
                    item.showExtraInfo = false;
                    item.lastestTrack = false;
                });
            },
            renderListView: function (listview, data) {
                this.orders = data;
            },
            renderListViewPage: function (listview, page) {
                this.totalCount = page.totalCount;
            },
            actionsheetselected: function (actionsheet, item) {
                this.status = item.value;
                this.$refs.listview.filter({
                    status: item.value ? [item.value] : item.value
                });
            }
        }
    };

    return exports;
});

