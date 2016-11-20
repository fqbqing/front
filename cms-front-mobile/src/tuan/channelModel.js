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
				tuan_id: query.tuan_id
			};
		}
    };

	return exports;
});

