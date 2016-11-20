/**
 * Created by lifayu on 14/12/30.
 */

define(function (require) {

    var ajax = require('./hook/ajax');

    var etpl = require('etpl');

    etpl.config({
        namingConflict: 'ignore'
    });

    var apiConfig = {
        user: '/api/user-company/session',
        constants: '/api/system/constants',
        login: '/api/login/login',
        logout: '/api/login/logout',
        sendUserCompanyVerifyCode: '/api/user-company/send-verification-code',
        resetUserCompanyPassword: '/api/user-company/self-reset-password',
        //团购订单
        listTuanOrder: '/api/tuan-order/list',
        getTuanOrderById: '/api/tuan-order/info',
        updateTuanOrder: '/api/tuan-order/update',
        // 核销订单
        checkTuanSale: '/api/tuan-order/check-sale',
        dealTuanOrder: '/api/tuan-order/deal',
        getTuanOrderByCN: '/api/tuan-order/info-by-cn',
        // 签到
        tuanSignIn: '/api/tuan-order/sign-in',
        //团购管理
        listTuan: '/api/tuan/list',
        deleteTuan: '/api/tuan/delete',
        updateTuan: '/api/tuan/update',
        getTuanById: '/api/tuan/info',
        addTuan: '/api/tuan/add',
        commitTuan: '/api/tuan/commit',
        getTuanShareQRCodeImage: '/api/tuan/qrcode-share',
        //订单列表
        listOrder: '/api/order/list',
        getOrderById: '/api/order/info',
        updateOrder: '/api/order/update',
        // 订单统计
        statTuanOrder: '/api/statistics/tuan-orders',
        statTuanOrderIntention: '/api/statistics/order-intention',
        statTuanChannel: '/api/statistics/channel-effect',
        statSummary: '/api/statistics/summary',
        statTuanDealModel: '/api/statistics/deal-model',
        // 客户管理
        listCustomer: '/api/customer/list',
        getCustomerById: '/api/customer/info',
        updateCustomer: '/api/customer/update',
        getCustomerTuanOrders: '/api/customer/get-tuan-orders',
        distributeCustomerPublic: '/api/customer/distribute-public',
        distributeCustomer: '/api/customer/distribute',
        // 客户追踪
        listCustomerTrack: '/api/customer-track/list',
        addCustomerTrack: '/api/customer-track/add',
        updateCustomerTrack: '/api/customer-track/update',
        deleteCustomerTrack: '/api/customer-track/delete',
        getLastestCustomerTrack: '/api/customer-track/get-lastest-track',
        // 用户管理
        listCompanyUser: '/api/user-company/list',
        listUserGroup: '/api/user-group/list',
        // 个人中心
        getMyInfo: '/api/user-company/personal-info',
        updatePassword:  '/api/user-company/update-password',
        // 微信公众号
        getWeixinConfig: '/api/weixin/js-params',

        activityTypes: '/api/statistics/activity',
        listExhibition: '/api/exhibition-coupon-activity/list',
        getExhibitionById: '/api/exhibition-coupon-activity/info',
        statExhibitionOrder: '/api/statistics/exhibition-orders',
        getExhibitionShareQRCodeImage: '/api/exhibition-coupon-activity/qrcode-share',
        listExhibitionOrder: '/api/exhibition-coupon-order/list',
        statExhibitionChannel: '/api/statistics/exhibition-channel-effect',

        globalSearchByPhone: '/api/statistics/global-search',

        //优惠券活动管理
        listVoucherActivity: '/api/coupon-activity/list',
        getVoucherActivityById: '/api/coupon-activity/info',
        voucherActivityShareQRCode: '/api/coupon-activity/qrcode-share',
        //优惠券管理
        getVoucherById: '/api/voucher/info',
        voucherList: '/api/voucher/list',
        //优惠券订单管理
        voucherOrderList: '/api/voucher-order/list',
        getVoucherOrderById: '/api/voucher-order/info',
        voucherOrderCheckSale:'/api/voucher-order/check-sale',
        getVoucherOrderByCN: '/api/voucher-order/info-by-cn',
        voucherClaimedStatistics: '/api/coupon-activity/statistics',
        voucherChannelStatistics: '/api/coupon-activity/channel-statistics',
        statVoucherOrder: '/api/statistics/voucher-orders',

        // 新团购 (Groupon)
        listGroupon: '/api/groupon-activity/list',
        getGrouponById: '/api/groupon-activity/info',
        addGroupon: '/api/groupon-activity/add',
        updateGroupon: '/api/groupon-activity/update',
        deleteGroupon: '/api/groupon-activity/delete',
        commitGroupon: '/api/groupon-activity/commit',
        listGrouponSignup: '/api/activity-signup/groupon-list',
        grouponChannelStatistics: '/api/groupon-activity/channel-statistics',
        grouponSignupStatistics: '/api/groupon-activity/statistics',

        // 退款确认单
        getRefundById: '/api/refund/info',
        updageRefundSignature: '/api/refund/update',
        claimedCustomer: '/api/customer/claim'

    };

    var config = {
        api: ajax.createRequest(apiConfig)
    };

    return config;
});