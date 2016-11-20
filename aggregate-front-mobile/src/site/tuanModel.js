/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

	var constants = require('common/constants');

	var currentCity = constants.currentCity;

	var api = require('common/config').api;

	var exports = {};

	exports.mutations = {
		CHANGE_CITY: function (state, city) {
			state.city = city;
		}
	};

	exports.datasource = {
		tuanList: function (query) {
			var params = {
				cityId: query.city || currentCity.id,
				pageNo: query.page || 1
			};
			if (query.brand) {
				params.brandId = query.brand;
			}
			return api.aggregateList(params);
		},
		bannerList: function (query) {
			// 在有品牌筛选的情况下，不展示banner信息
			if (query.brand || +query.page > 1) {
				return [];
			}
			return api.adBannerList({
				cityId: query.city || currentCity.id
			});
		},
		hotBrands: function (query) {
			return api.hotBrandList({
				cityId: query.city || currentCity.id
			});
		},
		city: function (query) {
			if (query.city) {
				return api.getCityInfo({
					id: query.city
				});
			}
			return currentCity;
		}
    };

	exports.getTuanList = function (page) {
		var query = this.query;
		var params = {
			pageNo: page,
			cityId: query.city || currentCity.id
		};
		if (query.brand) {
			params.brandId = query.brand;
		}
		return api.aggregateList(params);
	};

	return exports;
});

