/**
 * @file 
 * @author ()
 */

define(function (require) {

    var frozen = require('frozen');
    var u = require('underscore');

    var exports = {};

    exports.template = require('./detail.tpl.html');

	exports.templateMainTarget = 'TPL_customer_detail';

    exports.domEvents = {
	};

    exports.events = {
        ready: function () {
            var tab = new frozen.Scroll('.customer-detail .ui-tab', {
                role: 'tab',
                autoplay: false
            });

            tab.on('beforeScrollStart', function(from, to) {
            });

            tab.on('scrollEnd', function(curPage) {
            });
        }
    };

    exports.vueOptions = {
        data: {
            trackContent: '',
            totalCount: 0,
            tracks: []
        },
        methods: {
            addCustomerTrack: function () {
                if (this.trackContent) {
                    this.$view.emit('ADD_CUSTOMER_TRACK', this.trackContent);
                }
            },
            distributeUser: function () {
                if(this.isLevelAllow('customer.distribute|customer.distribute-public') && this.isUserAllow('customer.distribute|customer.distribute-public')){
                    this.$view.emit('DISTRIBUTE_USER');
                }

            },
            editName: function () {
                if(this.isLevelAllow('customer.update') && this.isUserAllow('customer.update')){
                    this.$view.emit('EDIT_NAME');
                }
            },
            claimedCustomer: function (content) {
                this.$view.emit('CLAIMED_CUSTOMER',content);
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
            renderListView: function (listview, data) {
                this.tracks = data;
            },
            renderListViewPage: function (listview, page) {
                this.totalCount = page.totalCount;
            },
            actionsheetselected: function (actionsheet, item) {
                this.$view.emit('UPDATE_CUSTOMER_RATING', item.value);
            }
        }
    };

    return exports;
});

