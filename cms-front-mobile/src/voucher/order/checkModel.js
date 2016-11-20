/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

	var api = require('common/config').api;

	var exports = {};

	exports.datasource = {
		order: function (query) {
			return api.getVoucherOrderByCN({
				cn: query.cn,
				category: query.category || 'common'
			});
		}
    };

	exports.checkSale = function () {
		return api.voucherOrderCheckSale({
			cn: this.query.cn,
			category: this.query.category || 'common'
		});
	};

	return exports;
});

