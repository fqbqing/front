/**
 * @file 
 * @author ()
 */

define(function (require) {

	var user = require('common/user');

	var api = require('common/config').api;

	var exports = {};

	exports.datasource = {
		api: api,
		user: function () {
			return user.userInfo;
		},
		customer: function (query) {
			return api.getCustomerById({
				id: query.id
			});
		},
        tuanOrders: function (query) {
            return api.listTuanOrder({
				customer_id: query.id
            }).then(function (page) {
				return page.data || page.result;
			});
        },
		grouponSignups: function (query) {
			return api.listGrouponSignup({
				customer_id: query.id
			}).then(function (page) {
				return page.data || page.result;
			});
		},
		exhibitionOrders: function (query) {
			return api.listExhibitionOrder({
				customer_id: query.id
			}).then(function (page) {
				return page.data || page.result;
			});
		},
		voucherOrders: function (query) {
			return api.voucherOrderList({
				customer_id: query.id
			}).then(function (pager) {
				return pager.data || pager.result;
			});
		},
		listExtraData: function (query) {
			return {
				customer_id: query.id
			};
		}
    };

	exports.updateRating = function (rating) {
		return api.updateCustomer({
			id: this.query.id,
			rating: rating
		});
	};

	exports.fetchCustomer = function () {
		return api.getCustomerById({
			id: this.query.id
		});
	};
	exports.distributeUser = function (e) {
		var me = this;
		var data = {
			id: this.get('customer').id,
			user_company_id: e.user_company_id
		};
		if(!this.get('customer').owner) {
			//无归属分配
			return api.distributeCustomerPublic(data);
		}else {
			//有归属非配
			return api.distributeCustomer(data);
		}
	};
    /**
     * 添加追踪记录
     * @param {string} content 内容
     * @return {Promise}
     */
    exports.addCustomerTrack = function (content) {
        return api.addCustomerTrack({
            customer_id: this.query.id,
            content: content
        });
    };
	exports.updateCustomer = function (content) {
		return api.updateCustomer(content);
	};
	exports.claimedCustomer = function (content) {
		return api.claimedCustomer({
			id: content.id
		});
	};

	return exports;
});

