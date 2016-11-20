/**
 * 全局常量定义
 * Created by lifayu on 14/12/30.
 */

define(function (require) {

    var config = {
        RUN_ENV: 'prod', //'dev',
        //RUN_ENV: 'dev',
        BASE_URL: require.toUrl().replace(/\/\?.+?$/, ''),
        SERVICE_NAME: '车大卖',
        SAFE_DOMAIN_LIST: [
            'yijiamaiche.com',
            'm.yijiamaiche.com'
        ],
        ERROR_CODE: {
            ERROR_UNKNOWN: 1,
            ERROR_NET_NOT_AVAILABLE: 2,
            ERROR_NOT_LOGINED: 3,
            // 没有功能权限
            ERROR_NO_AUTH: 40001,
            // 客户级别不够
            ERROR_NO_LEVEL: 40002
        }
    };

    return config;
});