/**
 * @file 
 * @author ()
 */

define(function (require) {

	var api = require('common/config').api;

	var user = require('common/user');

	var exports = {};

	exports.datasource = {
		user: function () {
			return user.userInfo;
		},
		summary: function () {
			return api.statSummary();
		},
		tuans: function (query) {
			var me = this;
			var param = {
				status: 1, // 已上线
				pageNo: 1,
				pageSize: 6
			};
			return api.listTuan(param).then(function (page) {
				return page.data;
			}, function () {
			});
		},
		groupons: function (query) {
			var me = this;
			var param = {
				status: 1, // 已上线
				pageNo: 1,
				pageSize: 6
			};
			return api.listGroupon(param).then(function (page) {
				return page.data;
			}, function () {
			});
		},
		exhibitions: function (query) {
			var me = this;
			var param = {
				status: 1, // 已上线
				pageNo: 1,
				pageSize: 6
			};
			return api.listExhibition(param).then(function (page) {
				return page.data;
			}, function () {
			});
		},
		wxConfig: function () {
			return api.getWeixinConfig({
				url: encodeURIComponent(window.location.href)
			});
		},
		voucher_activitys: function (query) {
			var me = this;
			var param = {
				status: 1, // 已上线
				pageNo: 1,
				pageSize: 6
			};
			return api.listVoucherActivity(param).then(function (page) {
				return page.data;
			}, function () {
			});
		}
	};

	return exports;
});

