/**
 * @file
 * @author ()
 */

define(function (require) {

    var $ = require('zepto');

    var exports = {};
    exports.template = require('./list.tpl.html');

    exports.templateMainTarget = 'TPL_voucher/activity_list';

    exports.domEvents = {
    };

    exports.events = {

    };

    exports.vueOptions = {
        data: {
            //grade: '',
            totalCount: 0,
            voucher_activitys: []
        },
        events: {
            search: function (searchbox, keywords) {
                this.$refs.listview.filter({
                    title: keywords
                });
            },
            renderListView: function (listview, data) {
                this.voucher_activitys = data;
            },
            renderListViewPage: function (listview, page) {
                this.totalCount = page.totalCount;
            }
            //actionsheetselected: function (actionsheet, item) {
            //    this.grade = item.value;
            //    this.$refs.listview.filter({
            //        grade: item.value
            //    });
            //}
        }
    };

    return exports;
});

