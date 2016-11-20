/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.template = require('./info.tpl.html');

	exports.templateMainTarget = 'TPL_my_info';

    exports.domEvents = {
	};

    exports.events = {
    };

    exports.vueOptions = {
        methods: {
            logout: function () {
                this.$view.emit('logout');
            }
        }
    };

    return exports;
});

