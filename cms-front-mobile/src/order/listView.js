/**
 * @file 
 * @author ()
 */

define(function (require) {

    var $ = require('zepto');

    var config = {};

    config.template = require('./list.tpl.html');

	config.templateMainTarget = 'TPL_order_list';

    config.domEvents = {
	};

    var loadlock = false;

    function enableScrollLoad() {
        var me = this;
        var $win = $(window);
        var $doc = $(document);
        $win.on('scroll.orderlist', function (e) {
            var st = $win.scrollTop();
            var dh = $doc.height();
            var wh = $win.height();
            if (st > 0 && dh > wh && dh <= st + wh) {
                if (!me.vm.loading && !loadlock) {
                    loadlock = true;
                    me.vm.loading = true;
                    me.emit('loadMoreOrder');
                    setTimeout(function () {
                        loadlock = false;
                    }, 2000);
                }
            }
        });
    }

    function disableScrollLoad() {
        $(window).off('scroll.orderlist');
    }

    config.events = {
        ready: function () {
            var me = this;
            enableScrollLoad.call(me);
        },
        revived: function  () {
            enableScrollLoad.call(this);
        },
        sleep: function () {
            disableScrollLoad();
        },
        leave: function () {
            disableScrollLoad();
        }
    };

    config.vueOptions = {
        methods: {
            showDetail: function (order) {
                this.$view.emit('showOrderDetail', order);
            },
            search: function () {
                this.$view.emit('search', {
                    status: this.status,
                    phone: this.phone
                });
                this.$els.searchbox.blur();
            }
        }
    };

    return config;
});

