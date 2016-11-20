/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var exports = {};

    exports.template = require('./list.tpl.html');

    exports.templateMainTarget = 'TPL_groupon_activity_list';

    exports.domEvents = {
    };

    exports.events = {
    };

    exports.vueOptions = {
        data: {
            totalCount: 0,
            groupons: []
        },
        events: {
            search: function (searchbox, keywords) {
                this.$refs.listview.filter({
                    name: keywords
                });
            },
            renderListView: function (listview, data) {
                this.groupons = data;
            },
            renderListViewPage: function (listview, page) {
                this.totalCount = page.totalCount;
            }
        }
    };

    return exports;
});

