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
				order_id: query.order_id
			})
		}
    };

	exports.checkDeal = function (e) {
		return api.dealTuanOrder({
			order_id: this.query.order_id,
			deal_model: e.intention
		});
	};


	return exports;
});

