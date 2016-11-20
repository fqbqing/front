/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {

    // Action配置
    // 如果期望添加action时工具自动配置，请保持actionsConfig名称不变
    var actionsConfig = [
        {
            type: 'main/organization/statistics/Index',
            path: '/organization/statistics/index'
        }

    ];

    var controller = require('er/controller');
    controller.registerAction(actionsConfig);

    // 这里可以添加一些模块配置
    // 如请求地址，表格fields等
    // 国际化相关语言定义，请使用lang，不建议在config中定义
    var config = {
        kpiList: [{
            text: '团购报名',
            value: 'tuanOrderCount'
        }, {
            text: '优惠券领券',
            value: 'voucherOrderCount'
        },{
            text: '车展报名',
            value: 'exhibitionOrderCount'
        }, {
            text: '新增客户',
            value: 'customerCount'
        }, {
            text: '客户跟进',
            value: 'customerTrackCount'
        }]
    };

    return config;
});
