/**
 * @file 
 * @author ()
 */

define(function (require) {

	var api = require('common/config').api;
	var user = require('common/user');

	var exports = {};

	exports.datasource = {
		organization: function () {
			return user.userInfo.organization;
		},
		api: api,
		listExtraData: function (query) {
			return {
				owner_status: 2
			};
		}

    };
	exports.claimedCustomer = function (param) {
		return api.claimedCustomer(param);
	};

	return exports;
});

