/**
 * @file 全局常量
 * @author ()
 */

define(function (require) {

    var constants = {
        cookie: {
            // 团购引导
            grouponIntro: 'gi'
        },
        TUAN_ORDER_STATUS_LIST: [
           /* {   value: '0',
                text: '未支付'
            },
            {   value: '1',
                text: '支付失败'
            },*/
            {   value: '0|1',
                text: '报名成功'
            },
            {   value: '2',
                text: '购买成功'
            },
            {   value: '3',
                text: '已经使用'
            },
            {   value: '4',
                text: '申请退款'
            },
            {   value: '5',
                text: '已退款'
            },
            {   value: '9',
                text: '退款中'
            }
        ],
        GOOD_ORDER_STATUS_LIST: [
            {   value: '0',
                text: '待支付'
            },
            {   value: '1',
                text: '已支付'
            },
            {   value: '2',
                text: '已取消'
            },
            {   value: '3',
                text: '系统自动取消'
            },
            {   value: '4',
                text: '申请退款'
            },
            {   value: '5',
                text: '退款成功'
            }
        ],
        PAYMENT_LIST:[
            {
                value: '1',
                text: '微信支付'
            },
            {
                value: '2',
                text: '支付宝支付'
            }
        ],
        ACTIVITY_TYPE_LIST: [
            {
                name: '首页轮播',
                value: '1'
            },
            {
                name: '热门活动',
                value: '2'
            },
            {
                name: '推荐活动',
                value: '3'
            }
        ],
        BASE_UPLOAD_CONFIG: {
            pick: {
                multiple: false
            },
            server: '/api/image/upload',
            fileVal: 'upfile',
            chunked: false,
            threads: 1,
            disableGlobalDnd: true,
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            auto: true,
            sendAsBinary: false,
            fileNumLimit: 1,
            fileSingleSizeLimit: 2 * 1024 * 1024
        },
        CAR_BUYING_WAY: {
            1: '全款购车',
            2: '贷款购车',
            3: '未确定'
        },
        CUSTOMER_RATING_LIST: [
            {
                text: '即将购买',
                value: 'H'
            },
            {
                text: '一周内购买',
                value: 'A'
            },
            {
                text: '一个月内购买',
                value: 'B'
            },
            {
                text: '三个月内购买',
                value: 'C'
            },
            {
                text: '无效用户',
                value: 'D'
            },
            {
                text: '战败',
                value: 'F'
            },
            {
                text: '已经购买',
                value: 'O'
            }
        ],
        THEME_LIST: [{
            id: 1,
            name: 'default',
            text: '科幻',
            src: require.toUrl('common/img/theme-1.png')
        },{
            id: 2,
            name: 'young',
            text: '年轻',
            src: require.toUrl('common/img/theme-2.png')
        },{
            id: 3,
            name: 'freshness',
            text: '清新',
            src: require.toUrl('common/img/theme-3.png')
        },{
            id: 4,
            name: 'steady',
            text: '稳重',
            src: require.toUrl('common/img/theme-4.png')
        }],
        EXHIBITION_STATUS_LIST: [
            {
                value: '0',
                text: '已领取'
            },{
                value: '1',
                text: '已签到'
            },{
                value: '2|3',
                text: '已使用'
            }
        ],
        //用于标记新团购活动报名列表状态/优惠券活动订单列表状态
        ORDER_STATUS_LIST: [

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
                text: '退款失败',
                value: '7'
            },
            {
                text: '系统取消',
                value: '3'
            },
            {
                text: '用户取消',
                value: '8'
            }
        ],
        ORDER_STATUS_SUCCESS: 1, //领取成功
        ORDER_STATUS_NOT_PAY: 2, //未支付
        ORDER_STATUS_SYSTEM_CANCELED: 3, //系统自动取消
        ORDER_STATUS_APPLY_REFUND: 4, //用户申请退款
        ORDER_STATUS_USED: 5, //已使用
        ORDER_STATUS_REFUNDED: 6, //已经退款
        ORDER_STATUS_REFUND_FAILED: 7, //退款失败
        ORDER_STATUS_CANCELED: 8, //退款失败

        VOUCHER_PAYMENT_LIST: [
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
        //公开公共数据
        SHOW_PUBLIC_CUSTOMER_LIST: [
            {
                value: '1',
                text: '是'
            },
            {
                value: '0',
                text: '否'
            }
        ],
        SHOW_PUBLIC_CUSTOMER_YES: 1,   //是
        SHOW_PUBLIC_CUSTOMER_NO: 0,   //否

        //店开启经纪人模式
        AGENT_SPREAD_LIST: [
            {
                value: '1',
                text: '是'
            },
            {
                value: '0',
                text: '否'
            }
        ],
        AGENT_SPREAD_YES: 1,   //是
        AGENT_SPREAD_NO: 0,    //否
        
        // 奖励阶段
        STAGE_SIGNUP: 1,    // 报名
        STAGE_DEAL: 2,      // 成交
        // 奖励类型
        AWARD_TYPE_LIST: [
            {
                value: '0',
                text: '无奖励'
            },
            {
                value: '1',
                text: '现金奖励'
            },
            {
                value: '2',
                text: '优惠券奖励'
            }
        ],
        AWARD_TYPE_NO: 0,        //无奖励
        AWARD_TYPE_CASH: 1,      // 现金
        AWARD_TYPE_VOUCHER: 2,   // 优惠券
        // 收益状态
        AWARD_STATUS_LIST: [
            {
                value: '1|2|3',
                text: '全部'
            },
            {
                value: '1',
                text: '未审核'
            },
            {
                value: '2',
                text: '已通过'
            },
            {
                value: '3',
                text: '已驳回'
            }
        ],
        AWARD_STATUS_NOT_AUDIT: 1,  // 未审核
        AWARD_STATUS_AUDITED: 2,    // 审核通过
        AWARD_STATUS_REFUSED: 3,    // 已驳回
        // 经销商代理状态
        AGENT_STATUS_FORBIDDEN: 0,  // 被禁用
        AGENT_STATUS_VALID: 1,      // 有效
        // 提现单状态
        WITHDRAW_STATUS_LIST: [
            {
                value: '1|2|3',
                text: '全部'
            },
            {
                value: '1',
                text: '未提现'
            },
            {
                value: '2',
                text: '已提现'
            },
            {
                value: '3',
                text: '已驳回'
            }
        ],
        WITHDRAW_STATUS_WITHDRAWING: 1,         // 提现中
        WITHDRAW_STATUS_WITHDREW: 2,            // 已确认提现
        WITHDRAW_STATUS_REJECT: 3,   // 驳回
        //活动上下线
        ACTIVITY_STATUS_NOT_ONLINE: 0,   //未上线
        ACTIVITY_STATUS_ONLINE: 1,       //已上线
        ACTIVITY_STATUS_OFFLINE: 2,      //已下线
        //签到状态
        SIGN_IN_STATUS_NO: 0,         //未签到
        SIGN_IN_STATUS_YES: 1,           //已签到
        //成交状态
        DEAL_STATUS_NO: 0, //未成交
        DEAL_STATUS_YES: 1, //已成交
        // 账户收款方
        RECEIVER_CHEDAMAI: 1, // 车大卖
        RECEIVER_SELF: 2 // 4s店自己
    };
    return constants;
});
