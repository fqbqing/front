/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.template = require('./signin.tpl.html');

	exports.templateMainTarget = 'TPL_tuan/order_signin';

    exports.domEvents = {
	};

    exports.events = {
    };

    exports.vueOptions = {
        methods: {
            signIn: function () {
                this.$view.emit('SIGN_IN');
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

