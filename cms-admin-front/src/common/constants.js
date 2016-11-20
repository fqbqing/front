/**
 * @file 全局常量
 * @author ()
 */

define(function (require) {

    var constants = {
        TUAN_STATUS: [
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
        ORDER_STATUS: [
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
        PAYMENTS:[
            {
                value: '1',
                text: '微信支付'
            },
            {
                value: '2',
                text: '支付宝支付'
            }
        ],
        ACTIVITY_TYPE: [
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
        CUSTOMER_RATING: [
            {
                text: '未分级',
                value: ''
            },
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
        THEME: [{
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
        EXHIBITION_STATUS: [{
            value: '0',
            text: '已领取'
        },{
            value: '1',
            text: '已签到'
        },{
            value: '2|3',
            text: '已使用'
        }],
        AD_PLACE: [{
            value: '1',
            text: '顶部Banner'
        }],
        AGGREGATE_TYPE: [
            {
                value: '2',
                text: '新版团购活动'
            },
            {
                value: '1',
                text: '旧版团购活动'
            }
        ],
        VOUCHER_ORDER_STATUS: [

            {
                text: '未支付',
                value: '2'
            },
            {
                text: '已领取',
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
        ],
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
        // 奖励阶段
        STAGE_SIGNUP: 1,    // 报名
        STAGE_DEAL: 2,      // 成交
        // 奖励类型
        AWARD_TYPE: [
            {
                value: '1',
                text: '现金奖励'
            },
            {
                value: '2',
                text: '优惠券奖励'
            }
        ],
        AWARD_CASH: 1,      // 现金
        AWARD_VOUCHER: 2,   // 优惠券
        // 收益状态
        AWARD_STATUS: [
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
        WITHDRAW_STATUS: [
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
        WITHDRAWING: 1,         // 提现中
        WITHDREW: 2,            // 已确认提现
        WITHDRAW_CANCELED: 3   // 驳回
    };

    return constants;
});
