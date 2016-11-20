/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.template = require('./check.tpl.html');

	exports.templateMainTarget = 'TPL_tuan/order_check';

    exports.domEvents = {
	};

    exports.events = {
    };

    exports.vueOptions = {
        data: {
            intention: ''
        },
        methods: {
            checkSale: function () {
                if (this.intention.length > 0) {
                    this.$view.emit('CHECK_SALE', this.intention);
                }
                else {
                    this.$view.showTip('请选择客户购买的车型', 'warn');
                }
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

