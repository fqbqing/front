/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {

    // Action配置
    // 如果期望添加action时工具自动配置，请保持actionsConfig名称不变
    var actionsConfig = [
        {
            type: 'main/staff/Chooser',
            path: '/staff/chooser'
        }
,
        {
            type: 'main/staff/List',
            path: '/staff/list'
        }
,
        {
            type: 'main/staff/Add',
            path: '/staff/add'
        },
        {
            type: 'main/staff/Add',
            path: '/staff/edit'
        },
        {
            type: 'main/staff/Index',
            path: '/staff/index'
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
