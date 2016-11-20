/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var $ = require('zepto');
    var Swiper = require('swiper');
    var exports = {};

    exports.template = require('./groupon.tpl.html');

	exports.templateMainTarget = 'TPL_site_groupon';

    exports.domEvents = {
	};

    exports.events = {
        'ready': function () {
        }
    };

    exports.vueOptions = {
        data: {},
        computed: {
            page: function () {
                return +this.query.page || 1;
            },
            hasNextPage: function () {
                var pager = this.grouponList.pagination;
                return Math.ceil(+pager.totalCount / pager.defaultPageSize) > this.page;
            }
        },
        methods: {
            loadGrouponByPage: function () {
                this.context.view.emit('loadGrouponByPage', this.page + 1);
            }
        }
    }
    return exports;
});

