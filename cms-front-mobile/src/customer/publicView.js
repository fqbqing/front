/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.template = require('./public.tpl.html');

	exports.templateMainTarget = 'TPL_customer_public';

    exports.domEvents = {
	};

    exports.events = {
    };

    exports.vueOptions = {
        data: {
            totalCount: 0,
            customers: []
        },
        methods: {
            claimedCustomer: function (param,index) {
                this.$view.emit('claimedCustomer',param,index);
            }
        },
        events: {
            renderListView: function (listview, data) {
                this.customers = data;
            },
            renderListViewPage: function (listview, page) {
                this.totalCount = page.totalCount;
            }
        }
    };

    return exports;
});

