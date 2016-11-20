/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {

    // Action配置
    // 如果期望添加action时工具自动配置，请保持actionsConfig名称不变
    var actionsConfig = [
        {
            type: 'cms/organization/Pay',
            path: '/organization/pay'
        }
,
        {
            type: 'cms/organization/Edit',
            path: '/organization/edit'
        }
,
        {
            type: 'cms/organization/Detail',
            path: '/organization/detail'
        }
,
        {
            type: 'cms/organization/Staff',
            path: '/organization/staff'
        },
        {
            type: 'cms/organization/Init',
            path: '/organization/init'
        }

    ];

    var controller = require('er/controller');
    controller.registerAction(actionsConfig);

    // 这里可以添加一些模块配置
    // 如请求地址，表格fields等
    // 国际化相关语言定义，请使用lang，不建议在config中定义
    var config = {
        PAY_ACCOUNT_LIST: [{
            text: '车大卖账户',
            value: '0'
        }, {
            text: '自有对公账户',
            value: '1'
        }],
        PAY_ACCOUNT_CHEDAMAI: 0,
        PAY_ACCOUNT_PRIVATE: 1,

        ALI_PAY_ACCOUNT: 1,
        WEIXIN_PAY_ACCOUNT: 2,

        PAY_ACCOUNT_DISABLE: 0,
        PAY_ACCOUNT_ENABLE: 1


    };

    return config;
});
