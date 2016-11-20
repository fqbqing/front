/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {

    // Action配置
    // 如果期望添加action时工具自动配置，请保持actionsConfig名称不变
    var actionsConfig = [
        {
            type: 'cms/voucher/activity/edit/Configure',
            path: '/voucher/activity/edit/configure'
        }
,
        {
            type: 'cms/voucher/activity/edit/Set',
            path: '/voucher/activity/edit/set'
        }
,
        {
            type: 'cms/voucher/activity/edit/Description',
            path: '/voucher/activity/edit/description'
        }
,
        {
            type: 'cms/voucher/activity/edit/Base',
            path: '/voucher/activity/edit/base'
        }

    ];

    var controller = require('er/controller');
    controller.registerAction(actionsConfig);

    // 这里可以添加一些模块配置
    // 如请求地址，表格fields等
    // 国际化相关语言定义，请使用lang，不建议在config中定义
    var config = {
    };

    return config;
});
