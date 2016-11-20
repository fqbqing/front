/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {

    // Action配置
    // 如果期望添加action时工具自动配置，请保持actionsConfig名称不变
    var actionsConfig = [
        {
            type: 'main/overview/Index',
            path: '/overview/index'
        }

    ];

    var controller = require('er/controller');
    controller.registerAction(actionsConfig);

    // 这里可以添加一些模块配置
    // 如请求地址，表格fields等
    // 国际化相关语言定义，请使用lang，不建议在config中定义
    var config = {
        kpiList: [{
            text: '新增开店',
            value: 'organizationCount'
        }, {
            text: '新增旧版团购',
            value: 'tuanCount'
        }, {
            text: '旧版团购报名',
            value: 'tuanOrderCount'
        }, {
            text: '新增新版团购',
            value: 'grouponCount'
        }, {
            text: '新版团购报名',
            value: 'grouponSingupCount'
        },{
            text: '新增优惠券活动',
            value: 'activityCount'
        }, {
            text: '优惠券领券',
            value: 'voucherOrderCount'
        }, {
            text: '车展报名',
            value: 'exhibitionOrderCount'
        }, {
            text: '新增车展活动',
            value: 'exhibitionActivityCount'
        }, {
            text: '新增客户',
            value: 'customerCount'
        }, {
            text: '客户追踪',
            value: 'customerTrackCount'
        }]
    };

    return config;
});
