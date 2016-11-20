/**
 * @file 
 * @author ()
 */

define(function (require) {

	var api = require('common/config').api;

	var user = require('common/user');

	var exports = {};

	exports.datasource = {
		result: function (query) {
			return api.globalSearchByPhone({
				phone: query.phone,
				pageSize: 10
			});
		}
	};

	return exports;
});

