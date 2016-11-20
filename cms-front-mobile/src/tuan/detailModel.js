/**
 * @file 
 * @author ()
 */

define(function (require) {

	var api = require('common/config').api;

	var exports = {};

	exports.datasource = {
		tuan: function (query) {
			return api.getTuanById({
				id: query.tuan_id
			});
		},
		statOrder: function (query) {
			return api.statTuanOrder({
				tuan_id: query.tuan_id
			});
		},
		statIntention: function (query) {
			return api.statTuanOrderIntention({
				tuan_id: query.tuan_id
			});
		},
		statDealModel: function (query) {
			return api.statTuanDealModel({
				tuan_id: query.tuan_id
			});
		}
    };

	exports.getQRCode = function () {
		return api.getTuanShareQRCodeImage({
			id: this.query.tuan_id
		});
	};

	return exports;
});

