/**
 * @file 
 * @author ()
 */

define(function (require) {

	var api = require('common/config').api;

	var exports = {};

	exports.datasource = {
		order: function (query) {
			return api.getTuanOrderByCN({
				cn: query.cn
			});
		}
    };

	exports.checkSale = function (e) {
		return api.checkTuanSale({
			cn: this.query.cn,
			deal_model: e.intention
		});
	};

	return exports;
});

