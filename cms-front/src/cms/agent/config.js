/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {

    // Action配置
    // 如果期望添加action时工具自动配置，请保持actionsConfig名称不变
    var actionsConfig = [
        {
            type: 'cms/agent/Withdraw',
            path: '/agent/withdraw'
        }
,
        {
            type: 'cms/agent/Check',
            path: '/agent/check'
        }
,
        {
            type: 'cms/agent/Income',
            path: '/agent/income'
        }
,
        {
            type: 'cms/agent/Rank',
            path: '/agent/rank'
        }
,
        {
            type: 'cms/agent/Statistics',
            path: '/agent/statistics'
        }
,
        {
            type: 'cms/agent/Detail',
            path: '/agent/detail'
        }
,
        {
            type: 'cms/agent/List',
            path: '/agent/list'
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
