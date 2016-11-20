/**
 * @file 
 * @author ()
 */

define(function (require) {

    var frozen = require('frozen');

    var exports = {};

    exports.template = require('./track.tpl.html');

	exports.templateMainTarget = 'TPL_customer_track';

    exports.domEvents = {
	};

    exports.events = {
        ready: function () {

        }
    };

    exports.vueOptions = {
        data: {
            totalCount: 0,
            tracks: []
        },
        methods: {

        },
        events: {
            renderListView: function (listview, data) {
                this.tracks = data;
            },
            renderListViewPage: function (listview, page) {
                this.totalCount = page.totalCount;
            }
        }
    };

    return exports;
});

