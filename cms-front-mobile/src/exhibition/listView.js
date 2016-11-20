/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.template = require('./list.tpl.html');

    exports.templateMainTarget = 'TPL_exhibition_list';
    exports.domEvents = {
    };

    exports.events = {

    };

    exports.vueOptions = {
        data: {
            totalCount: 0,
            exhibitions: []
        },
        events: {
            search: function (searchbox, keywords) {
                this.$refs.listview.filter({
                    title: keywords
                });
            },
            renderListView: function (listview, data) {
                this.exhibitions = data;
            },
            renderListViewPage: function (listview, page) {
                this.totalCount = page.totalCount;
            }

        }
    };

    return exports;

});
