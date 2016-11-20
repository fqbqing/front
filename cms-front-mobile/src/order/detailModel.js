/**
 * @file 
 * @author ()
 */

define(function (require) {

	var api = require('common/config').api;

	var exports = {};

	exports.datasource = {
		order: function (query) {
			return api.getOrderById({
				order_id: query.id
			});
		}
	};

	return exports;
});

