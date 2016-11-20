/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {

    // Action配置
    // 如果期望添加action时工具自动配置，请保持actionsConfig名称不变
    var actionsConfig = [
        {
            type: 'cms/good/specification/Chooser',
            path: '/good/specification/chooser'
        }
,
        {
            type: 'cms/good/specification/Values',
            path: '/good/specification/values'
        },
        {
            type: 'cms/good/specification/List',
            path: '/good/specification/list'
        }
    ];

    var controller = require('er/controller');
    controller.registerAction(actionsConfig);

    // 这里可以添加一些模块配置
    // 如请求地址，表格fields等
    // 国际化相关语言定义，请使用lang，不建议在config中定义
    var config = {
        SPEC_TYPE: {
            '1': '文本',
            '2': '颜色',
            '3': '图片'
        }
    };

    return config;
});
