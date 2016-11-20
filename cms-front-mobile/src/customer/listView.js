/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.template = require('./list.tpl.html');

	exports.templateMainTarget = 'TPL_customer_list';

    exports.domEvents = {
	};

    exports.events = {
    };

    exports.vueOptions = {
        data: {
            rating: '',
            totalCount: 0,
            customers: []
        },
        events: {
            search: function (searchbox, keywords) {
                this.$refs.listview.filter({
                    phone: keywords
                });
            },
            renderListView: function (listview, data) {
                this.customers = data;
            },
            renderListViewPage: function (listview, page) {
                this.totalCount = page.totalCount;
            },
            actionsheetselected: function (actionsheet, item) {
                this.rating = item.value;
                this.$refs.listview.filter({
                    rating: item.value
                });
            }
        }
    };

    return exports;
});

