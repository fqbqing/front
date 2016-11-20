/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {

    // Action配置
    // 如果期望添加action时工具自动配置，请保持actionsConfig名称不变
    var actionsConfig = [
        {
            type: 'cms/message/Detail',
            path: '/message/detail'
        }
,
        {
            type: 'cms/message/Index',
            path: '/message/index'
        }

    ];

    var controller = require('er/controller');
    controller.registerAction(actionsConfig);

    // 这里可以添加一些模块配置
    // 如请求地址，表格fields等
    // 国际化相关语言定义，请使用lang，不建议在config中定义
    var config = {
        //消息类型，1表示公告，2表示通知
        MESSAGE_TYPE_ANNOUNCEMENT: 1,
        MESSAGE_TYPE_NOTICE: 2,
        //消息状态
        MESSAGE_STATUS_UNSEND: 1, // 待发送
        MESSAGE_STATUS_SEND_FAILED: 2, //发送失败
        MESSAGE_STATUS_SEND_SUCCESS: 3, //发送成功
        MESSAGE_STATUS_UNREAD: 4, //业务系统未读
        MESSAGE_STATUS_READ: 5 // 已读取

};

    return config;
});
