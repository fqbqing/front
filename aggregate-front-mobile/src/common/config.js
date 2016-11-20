/**
 * Created by lifayu on 14/12/30.
 */

define(function (require) {

    var ajax = require('./hook/ajax');

    var etpl = require('etpl');

    etpl.config({
        namingConflict: 'ignore'
    });

    var apiConfig = {
        //user: '/api/staff/session',
        constants: '/api/system/constants',
        supportCityList: '/api/city/support',
        getCityInfo: '/api/city/info',
        hotBrandList: '/api/brand/hot',
        adBannerList: '/api/ad/banner',
        aggregateList: '/api/aggregate/list'
    };

    var config = {
        api: ajax.createRequest(apiConfig)
    };

    return config;
});