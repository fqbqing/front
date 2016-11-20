/**
 * @file 
 * @author ()
 */

define(function (require) {

	var api = require('common/config').api;

	var exports = {};

	exports.datasource = {
		info: function () {
			return api.getMyInfo();
		}
    };

	exports.logout = function () {
		return api.logout();
	};

	return exports;
});

