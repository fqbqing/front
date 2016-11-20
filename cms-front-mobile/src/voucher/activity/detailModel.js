/**
 * @file 
 * @author ()
 */

define(function (require) {

	var api = require('common/config').api;

	var exports = {};

	exports.datasource = {
		voucher_activity: function (query) {
			return api.getVoucherActivityById({
				id: query.id
			});
		},
		activityStatistics: function (query) {
			return api.voucherClaimedStatistics({
				id: query.id
			});
		}
    };

	exports.getQRCode = function () {
		return api.voucherActivityShareQRCode({
			id: this.query.id
		});
	};

	return exports;
});

