/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var $ = require('zepto');
    var Swiper = require('swiper');
    var exports = {};

    exports.template = require('./tuan.tpl.html');

	exports.templateMainTarget = 'TPL_site_tuan';

    exports.domEvents = {
	};

    exports.events = {
        'ready': function () {
        }
    };

    exports.vueOptions = {
        data: {
        },
        computed: {
            page: function () {
                return +this.query.page || 1;
            },
            hasNextPage: function () {
                var pager = this.tuanList.pagination;
                return Math.ceil(+pager.totalCount / pager.defaultPageSize) > this.page;
            }
        },
        methods: {
            loadTuanByPage: function () {
                this.context.view.emit('loadTuanByPage', this.page + 1);
            }
        }
    };

    exports.scrollToTuan = function () {
        var offset = $('.part-tuan', this.main).offset();
        window.scrollTo(0, offset.top);
    };

    return exports;
});

