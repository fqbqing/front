/**
 * @file 
 * @author ()
 */

define(function (require) {

	var api = require('common/config').api;

	var exports = {};

	exports.datasource = {
		order: function (query) {
			return api.getTuanOrderById({
				id: query.id
			});
		}
    };

	exports.updateTuanOrder = function (params) {
		return api.updateTuanOrder(params);
	};

	return exports;
});

