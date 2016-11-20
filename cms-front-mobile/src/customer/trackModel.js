/**
 * @file 
 * @author ()
 */

define(function (require) {

	var api = require('common/config').api;

	var exports = {};

	exports.datasource = {
		api: api,

		listExtraData: function (query) {
			return {
				user_company_id: query.user_company_id
			};
		}
	};

	return exports;
});

