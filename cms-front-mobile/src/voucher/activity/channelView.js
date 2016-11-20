/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.template = require('./channel.tpl.html');

	exports.templateMainTarget = 'TPL_voucher/activity_channel';

    exports.domEvents = {
	};

    exports.events = {
    };

    exports.vueOptions = {
        data: {
            status: '',
            totalCount: 0,
            channels: []
        },
        events: {
            renderListView: function (listview, data) {
                this.channels = data;
            },
            renderListViewPage: function (listview, page) {
                this.totalCount = page.totalCount;
            },
            actionsheetselected: function (actionsheet, item) {
                this.status = item.value;
                this.$refs.listview.filter({
                    status: item.value
                });
            }
        }
    };

    return exports;
});

