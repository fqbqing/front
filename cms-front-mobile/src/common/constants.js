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
            'chedamai.cn',
            's.chedamai.cn',
            'chedamai.com',
            'chedamai.babamaiche.com',
            'chedamaitest.babamaiche.com'
        ],
        ERROR_CODE: {
            ERROR_UNKNOWN: 1,
            ERROR_NET_NOT_AVAILABLE: 2,
            ERROR_NOT_LOGINED: 3,
            // 没有功能权限
            ERROR_NO_AUTH: 40001,
            // 客户级别不够
            ERROR_NO_LEVEL: 40002
        },
        // 团购订单状态
        TUAN_STATUS: [
            {
                value: '0|1',
                text: '报名成功'
            },
            {
                value: '2',
                text: '购买成功'
            },
            {
                value: '3',
                text: '已经使用'
            },
            {
                value: '4',
                text: '申请退款'
            },
            {
                value: '5',
                text: '已退款'
            },
            {
                value: '9',
                text: '退款中'
            }
        ],
        // 商城订单状态
        ORDER_STATUS: [
            {
                value: '0',
                text: '待支付'
            },
            {
                value: '1',
                text: '已支付'
            },
            {
                value: '2',
                text: '已取消'
            },
            {
                value: '3',
                text: '系统自动取消'
            },
            {
                value: '4',
                text: '申请退款'
            },
            {
                value: '5',
                text: '退款成功'
            }
        ],
        // 支付方式
        PAYMENTS: [
            {
                value: '1',
                text: '微信支付'
            },
            {
                value: '2',
                text: '支付宝支付'
            }
        ],
        // 支付方式
        VOUCHER_PAYMENTS: [
            {
                value: '0',
                text: '未支付'
            },
            {
                value: '1',
                text: '微信支付'
            },
            {
                value: '2',
                text: '支付宝支付'
            }
        ],
        CAR_BUYING_WAY: {
            1: '全款购车',
            2: '贷款购车',
            3: '未确定'
        },
        // 客户分级
        CUSTOMER_RATING: [
            {
                text: 'H级(即将购买)',
                value: 'H'
            },
            {
                text: 'A级(一周内购买)',
                value: 'A'
            },
            {
                text: 'B级(一个月内购买)',
                value: 'B'
            },
            {
                text: 'C级(三个月内购买)',
                value: 'C'
            },
            {
                text: 'D级(无效用户)',
                value: 'D'
            },
            {
                text: 'F级(战败)',
                value: 'F'
            },
            {
                text: 'O级(已经购买)',
                value: 'O'
            }
        ],
        //ACTIVITY_TYPE: [
        //    {
        //        name: '首页轮播',
        //        value: '1'
        //    },
        //    {
        //        name: '热门活动',
        //        value: '2'
        //    },
        //    {
        //        name: '推荐活动',
        //        value: '3'
        //    }
        //]

        ACTIVITY_TYPE: [
            {
                name: '团购活动',
                type: '1'
            },
            {
                name: '车展活动',
                type: '2'
            }
        ],
        // 车展活动订单状态
        EXHIBITION_STATUS: [
            {
                value: '0',
                text: '已领取'
            },
            {
                value: '1',
                text: '已签到'
            },
            {
                value: '2|3',
                text: '已使用'
            }

        ],
        VOUCHER_ORDER_STATUS: [
            {
                text: '未支付',
                value: '2'
            },
            {
                text: '未使用',
                value: '1'
            },
            {
                text: '已使用',
                value: '5'
            },
            {
                text: '申请退款',
                value: '4'
            },
            {
                text: '已退款',
                value: '6'
            },
            {
                text: '系统取消',
                value: '3'
            },
            {
                text: '用户取消',
                value: '8'
            }
        ]
    };

    return config;
});