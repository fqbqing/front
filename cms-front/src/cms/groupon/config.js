/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    // Action配置
    // 如果期望添加action时工具自动配置，请保持actionsConfig名称不变
    var actionsConfig = [
        {
            type: 'cms/groupon/Award',
            path: '/groupon/award'
        }
,
        {
            type: 'cms/groupon/Detail',
            path: '/groupon/detail'
        }
,
        {
            type: 'cms/groupon/List',
            path: '/groupon/list'
        }
,
        {
            type: 'cms/groupon/Add',
            path: '/groupon/add'
        },
        {
            type: 'cms/groupon/Add',
            path: '/groupon/edit'
        },
        {
            type: 'cms/groupon/Page',
            path: '/groupon/page'
        }

    ];

    var controller = require('er/controller');
    controller.registerAction(actionsConfig);

    // 这里可以添加一些模块配置
    // 如请求地址，表格fields等
    // 国际化相关语言定义，请使用lang，不建议在config中定义
    var config = {
        GROUPON_TYPE_LIST: [{
            name: '免费报名',
            value: 'free'
        }, {
            name: '支付意向金',
            value: 'pay'
        }],
        GROUPON_TYPE_FREE: 'free',
        GROUPON_TYPE_PAY: 'pay'
    };

    return config;
});
