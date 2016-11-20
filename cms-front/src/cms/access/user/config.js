/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {

    // Action配置
    // 如果期望添加action时工具自动配置，请保持actionsConfig名称不变
    var actionsConfig = [
        {
            type: 'cms/access/user/Role',
            path: '/access/user/role'
        }
,
        {
            type: 'cms/access/user/Chooser',
            path: '/access/user/chooser'
        }
,
        {
            type: 'cms/access/user/Add',
            path: '/access/user/add'
        }
,
        {
            type: 'cms/access/user/Add',
            path: '/access/user/edit'
        }
,
        {
            type: 'cms/access/user/List',
            path: '/access/user/list'
        }

    ];

    var controller = require('er/controller');
    controller.registerAction(actionsConfig);

    // 这里可以添加一些模块配置
    // 如请求地址，表格fields等
    // 国际化相关语言定义，请使用lang，不建议在config中定义
    var config = {
        userGroup: [
            {
                value: '1',
                text: '管理员'
            },{
                value: '2',
                text: '产品'
            },{
                value: '3',
                text: '运营'
            },{
                value: '4',
                text: '开发'
            },{
                value: '5',
                text: '财务'
            },{
                value: '6',
                text: '客服'
            },{
                value: '7',
                text: '销售'
            }
        ]
    };

    return config;
});
