/**
 * @file 
 * @author ()
 */

define(function (require) {

	var api = require('common/config').api;
	var u = require('underscore');

	var exports = {};

	exports.datasource = {
		user_company_list: function (query) {
			return api.listCompanyUser({
				group_id: query.group_id
			}).then(function (page) {
				return page.data || page.result;
			});
		}
    };

	return exports;
});

