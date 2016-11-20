/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {

    // Action配置
    // 如果期望添加action时工具自动配置，请保持actionsConfig名称不变
    var actionsConfig = [
        {
            type: 'cms/voucher/Detail',
            path: '/voucher/detail'
        }
,
        {
            type: 'cms/voucher/Chooser',
            path: '/voucher/chooser'
        }
,
        {
            type: 'cms/voucher/List',
            path: '/voucher/list'
        }
,
        {
            type: 'cms/voucher/Add',
            path: '/voucher/add'
        }

    ];

    var controller = require('er/controller');
    controller.registerAction(actionsConfig);

    // 这里可以添加一些模块配置
    // 如请求地址，表格fields等
    // 国际化相关语言定义，请使用lang，不建议在config中定义
    var config = {
        //优惠券类型
        VOUCHER_TYPE_LIST: [
            {
                name: '普通优惠券',
                value: '1'
            },
            {
                name: '经纪人优惠券',
                value: '3'
            }
        ],
        VOUCHER_TYPE_COMMON: '1', //普通优惠券
        VOUCHER_TYPE_AGENT: '3', //经纪人优惠券
        //
        PAY_NO: 0,  //免费领取
        PAY_YES: 1,  //设置价格
        //
        LIMITED_NO: 0,  //永久有效
        LIMITED_YES: 1 //设置时间

    };

    return config;
});
