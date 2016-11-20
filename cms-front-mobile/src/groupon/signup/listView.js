/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var u = require('underscore');
    var exports = {};

    exports.template = require('./list.tpl.html');

    exports.templateMainTarget = 'TPL_groupon_signup_list';

    exports.domEvents = {
    };

    exports.events = {
    };

    exports.vueOptions = {
        data: {
            status: '',
            totalCount: 0,
            signups: []
        },
        methods: {
            toggleOrder: function (order) {
                order.showExtraInfo = !order.showExtraInfo;
                if (!order.lastestTrack && order.customer) {
                    this.$view.emit('FETCH_CUSTOMER_TRACK', order);
                }
            }
        },
        filters: {
            signupOption: function (options) {
                var ret = {};
                u.each(options, function (opt) {
                    if (ret[opt.option]) {
                        ret[opt.option].push(opt.value);
                    }
                    else {
                        ret[opt.option] = [opt.value];
                    }
                });
                return ret;
            }
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
                this.signups = data;
            },
            renderListViewPage: function (listview, page) {
                this.totalCount = page.totalCount;
            },
            actionsheetselected: function (actionsheet, item) {
                this.status = item.value;
                this.$refs.listview.filter({
                    order_status: item.value
                });
            }
        }
    };

    return exports;
});

