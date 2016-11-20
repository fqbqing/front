/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.template = require('./list.tpl.html');

	exports.templateMainTarget = 'TPL_user-company_list';

    exports.domEvents = {
	};

    exports.events = {
        ready: function () {

        }
    };

    exports.vueOptions = {
        methods: {
            changeUser: function (item) {
                this.$view.emit('finish', item);
            }
        }
    };

    return exports;
});

