/**
 * @file 
 * @author ()
 */

define(function (require) {

	var api = require('common/config').api;

	var exports = {};

	exports.datasource = {
		voucher_orders: function (query) {
			return api.voucherOrderList({
				activity_id: query.activity_id,
				customer_id: query.customer_id
			}).then(function (pager) {
				return pager.data || pager.result;
			});
		}
    };



	return exports;
});

