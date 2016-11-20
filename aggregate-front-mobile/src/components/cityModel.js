/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

	var api = require('common/config').api;

	var exports = {};

	exports.datasource = {
		cities: function (query) {
			return api.supportCityList({
				type: query.type
			});
		}
    };

	return exports;
});

