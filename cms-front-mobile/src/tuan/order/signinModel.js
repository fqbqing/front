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
				order_id: query.cn
			});
		}
    };

	exports.signIn = function () {
		return api.tuanSignIn({
			order_id: this.query.cn
		});
	};

	return exports;
});

