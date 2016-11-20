/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.template = require('./deal.tpl.html');

	exports.templateMainTarget = 'TPL_tuan_order_deal';

    exports.domEvents = {
	};

    exports.events = {
    };

    exports.vueOptions = {
        data: {
            intention: ''
        },
        methods: {
            checkDeal: function () {
                if (this.intention.length > 0) {
                    this.$view.emit('CHECK_DEAL', this.intention);
                }
                else {
                    this.$view.showTip('请选择客户购买的车型', 'warn');
                }
            },
            toHome: function () {
                history.back();
            }
        }
    };

    return exports;
});

