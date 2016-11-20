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
		grouponList: function (query) {
			var params = {
				cityId: query.city || currentCity.id,
				pageNo: query.page || 1,
				type: query.type || 2
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
				cityId: query.city || currentCity.id,
				type: query.type || 2
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

	return exports;
});
