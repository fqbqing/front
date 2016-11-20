/**
 * @file 
 * @author ()
 */

define(function (require) {

	var api = require('common/config').api;

	var exports = {};

	exports.datasource = {
    };

	exports.sendVerifyCode = function (phone) {
		return api.sendUserCompanyVerifyCode({
			phone: phone
		});
	};

	exports.resetPassword = function (data) {
		return api.resetUserCompanyPassword(data);
	};

	return exports;
});

