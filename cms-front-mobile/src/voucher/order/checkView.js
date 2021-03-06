/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var exports = {};

    exports.template = require('./check.tpl.html');

	exports.templateMainTarget = 'TPL_voucher/order_check';

    exports.domEvents = {
	};

    exports.events = {
    };

    exports.vueOptions = {
        methods: {
            checkSale: function () {
                this.$view.emit('CHECK_SALE');
            },
            toHome: function () {
                if (history.length <= 2) {
                    // 通过location跳转，解决跳转后`扫码`不可用的问题
                    window.location.replace('/');
                }
                else {
                    history.back();
                }
            }
        }
    };

    return exports;
});

