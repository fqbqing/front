/**
 * 全局常量定义
 * Created by lifayu on 14/12/30.
 */

define(function (require) {

    var config = {
        ENV: 'dev',
        BASE_URL: require.toUrl().replace(/\/\?.+?$/, ''),
        SERVICE_NAME: '车大卖 - 全民经纪人',
        CDN_URL: '//img01.cdn.babamaiche.com',
        CUSTOMER_URL: 'http://malltest.babamaiche.com',
        // 奖励阶段
        STAGE_SIGNUP: 1,    // 报名
        STAGE_DEAL: 2,      // 成交
        // 奖励类型
        AWARD_CASH: 1,      // 现金
        AWARD_VOUCHER: 2,   // 优惠券
        // 收益单状态
        AWARD_STATUS_NOT_AUDIT: 1,  // 未审核
        AWARD_STATUS_AUDITED: 2,    // 审核通过
        AWARD_STATUS_REFUSED: 3,    // 已驳回
        // 经销商代理状态
        AGENT_STATUS_FORBIDDEN: 0,  // 被禁用
        AGENT_STATUS_VALID: 1,      // 有效
        // 提现单状态
        WITHDRAWING: 1,         // 提现中
        WITHDREW: 2,            // 已确认提现
        WITHDRAW_CANCELED: 3,   // 驳回
        // 优惠券订单状态
        VOUCHER_ORDER_UNUSED: 1,            // 未使用
        VOUCHER_ORDER_NOT_PAID: 2,          // 未支付
        VOUCHER_ORDER_SYSTEM_CANCELED: 3,   // 系统取消
        VOUCHER_ORDER_APPLY_REFUND: 4,      // 申请退款
        VOUCHER_ORDER_USED: 5,              // 已使用
        VOUCHER_ORDER_REFUNDED: 6,          // 已退款
        VOUCHER_ORDER_USER_CANCELED: 8,     // 用户取消
        // 错误码
        ERROR_CODE: {
            ERROR_UNKNOWN: 1,
            ERROR_NET_NOT_AVAILABLE: 2,
            ERROR_NOT_LOGINED: 9002001,
            // 没有功能权限
            ERROR_NO_AUTH: 40001,
            // 客户级别不够
            ERROR_NO_LEVEL: 40002
        }
    };

    if (/^agent\.chedamai\.cn$/.test(location.host)) {
        config.ENV = 'prod';
        config.CDN_URL = '//img01.chedamai.cn';
        config.CUSTOMER_URL = 'http://che.babamaiche.com';
    }
    return config;
});