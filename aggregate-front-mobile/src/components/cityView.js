/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var exports = {};

    exports.template = require('./city.tpl.html');

	exports.templateMainTarget = 'TPL_components_city';

    exports.domEvents = {
	};

    exports.events = {
        ready: function () {
        }
    };

    exports.vueOptions = {
        methods: {
            changeCity: function (city) {
                //this.context.emit('mutation', {
                //    type: 'CHANGE_CITY',
                //    payload: city
                //});
                this.context.emit('upstream', {
                    name: 'changeCity',
                    data: city
                })
            }
        }
    };

    return exports;
});

