/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var u = require('underscore');
    require('moment');
    // Action配置
    // 如果期望添加action时工具自动配置，请保持actionsConfig名称不变
    var actionsConfig = [
        {
            type: 'cms/customer/Info',
            path: '/customer/info'
        },
        {
            type: 'cms/customer/List',
            path: '/customer/list'
        }

    ];

    var controller = require('er/controller');
    controller.registerAction(actionsConfig);

    // 这里可以添加一些模块配置
    // 如请求地址，表格fields等
    // 国际化相关语言定义，请使用lang，不建议在config中定义
    var config = {
        allRating: [{
            name: "未分级",
            value: ""
        },
        {
            name: "即将购买",
            value: "H"
        },
        {
            name: "一周内购买",
            value: "A"
        },
        {
            name: "一个月内购买",
            value: "B"
        },
        {
            name: "三个月内购买",
            value: "C"
        },
        {
            name: "无效用户",
            value: "D"
        },
        {
            name: "战败",
            value: "F"
        },
        {
            name: "已经购买",
            value: "O"
        }],
        TRACK_TYPE_COMMON: 1,
        TRACK_TYPE_CUSTOMER_RATING: 2,
        TRACK_TYPE_CUSTOMER_OWNER: 3,
        TRACK_TYPE_CUSTOMER_NAME: 4

    };

    return config;
});
