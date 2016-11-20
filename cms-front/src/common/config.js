/**
 * @file 全局配置
 * @author ()
 */

define(function (require) {

    /**
     * Basic Console Compatibility
     */
    window.console = window.console || {};
    console.log = console.log || function () {};
    console.debug = console.debug || function () {};
    console.info = console.info || function () {};
    console.warn = console.warn || function () {};
    console.error = console.error || function () {};

    // 接口配置
    // 如果期望添加API时工具自动配置，请保持apiConfig名称不变
    var apiConfig = {
        globalSearchByPhone: '/api/statistics/global-search',
        user: '/api/user-company/session',
        constants: '/api/system/constants',
        updateOrganization: '/api/organization/update',
        getOrganization: '/api/organization/info',
        getStaff: '/api/organization/staff',
        groupTree: '/api/user-group/get-organization-tree',
        // 商品管理
        listGood: '/api/good/list',
        addGood: '/api/good/add',
        updateGood: '/api/good/update',
        getGoodById: '/api/good/info',
        deleteGood: '/api/good/delete',
        // 货品管理
        listProduct: '/api/product/list',
        addProduct: '/api/product/add',
        deleteProduct: '/api/product/delete',
        updateProduct: '/api/product/update',
        // 商品标签管理
        listTag: '/api/tag/list',
        addTag: '/api/tag/add',
        updateTag: '/api/tag/update',
        deleteTag: '/api/tag/delete',
        // 商品规格管理
        listSpecification: '/api/specification/list',
        addSpecification: '/api/specification/add',
        updateSpecification: '/api/specification/update',
        deleteSpecification: '/api/specification/delete',
        getSpecificationById: '/api/specification/info',
        listSpecificationValues: '/api/specification-value/list',
        addSpecificationValue: '/api/specification-value/add',
        deleteSpecificationValue: '/api/specification-value/delete',
        updateSpecificationValue: '/api/specification-value/update',
        // 商品分类管理
        listCategory: '/api/category/list',
        addCategory: '/api/category/add',
        updateCategory: '/api/category/update',
        deleteCategory: '/api/category/delete',
        getCategoryById: '/api/category/info',
        // 活动管理 （因为优惠券活动接口占用了activity）
        //listActivity: '/api/activity/list',
        //addActivity: '/api/activity/add',
        //updateActivity: '/api/activity/update',
        //getActivityById: '/api/activity/info',
        //deleteActivity: '/api/activity/delete',
        // 活动关联商品管理
        listActivityGood: '/api/activity-good/list',
        addActivityGood: '/api/activity-good/add',
        deleteActivityGood: '/api/activity-good/delete',
        //活动展示列表
        listActivityShow: '/api/activity-show/list',
        addActivityShow: '/api/activity-show/add',
        updateActivityShow: '/api/activity-show/update',
        getActivityShowById: '/api/activity-show/info',
        deleteActivityShow: '/api/activity-show/delete',
        //团购订单
        listTuanOrder: '/api/tuan-order/list',
        getTuanOrderById: '/api/tuan-order/info',
        updateTuanOrder: '/api/tuan-order/update',
        getTuanExcel: '/api/tuan-order/excel',
        tuanTitles: '/api/tuan/tuan-list',
        checkTuanOrder: '/api/tuan-order/check-sale',
        refundTuanOrder: '/api/tuan-order/refund',
        dealTuanOrder: '/api/tuan-order/deal',
        //活动管理
        listTuan: '/api/tuan/list',
        deleteTuan: '/api/tuan/delete',
        updateTuan: '/api/tuan/update',
        getTuanById: '/api/tuan/info',
        addTuan: '/api/tuan/add',
        commitTuan: '/api/tuan/commit', // 链接方式分享团购
        shareQrcode: '/api/tuan/qrcode-share',
        //订单列表
        listOrder: '/api/order/list',
        getOrderById: '/api/order/info',
        editOrder: '/api/order/update',
        // 订单统计
        statTuanOrder: '/api/statistics/tuan-orders',
        statTuanOrderIntention: '/api/statistics/order-intention',
        statTuanChannel: '/api/statistics/channel-effect',
        //statSummary: '/api/statistics/summary',
        statTuanDealModel: '/api/statistics/deal-model',
        //客户管理
        listCustomer: '/api/customer/list',
        getCustomerById: '/api/customer/info',
        updateCustomer: '/api/customer/update',
        releaseCustomer: '/api/customer/release',
        getTuanOrderByCustomerId: '/api/customer/get-tuan-orders',
        getOrderByUserId: '/api/customer/get-orders',
        getCustomerRating:  '/api/customer/get-rating',
        allRating: '/api/customer/all-ratings',
        getCustomerTrack: '/api/customer-track/list',
        updateCustomerTrack: '/api/customer-track/update',
        deleteCustomerTrack: '/api/customer-track/delete',
        addCustomerTrack: '/api/customer-track/add',
        distributeCustomerPublic: '/api/customer/distribute-public',
        distributeCustomer: '/api/customer/distribute',
        // 权限修改
        listAcl: '/api/acl/get-all',

        getAllDataPermissions: '/api/acl/get-all-data-permissions',
        // 角色管理
        listRole: '/api/role/list',
        addRole: '/api/role/add',
        deleteRole: '/api/role/delete',
        getRoleById: '/api/role/info',
        updateRolePermissions: '/api/role/update-permissions',
        getRolePermissions: '/api/role/get-permissions',
        getDataPermissions: '/api/role/get-data-permissions',
        updateDataPermissions:  '/api/role/update-data-permissions',
        updatePermissions: '/api/role/update-permissions',
        getPermissions: '/api/role/get-permissions',
        //用户管理
        listAccessUser: '/api/user-company/list',
        getUserById: '/api/user-company/info',
        addAccessUser: '/api/user-company/add',
        editAccessUser: '/api/user-company/update',
        deleteAccessUser: '/api/user-company/delete',
        getUserRoles: '/api/user-company/get-roles',
        updateUserRoles: '/api/user-company/update-roles',
        //用户组管理
        listAccessGroup: '/api/user-group/list',
        getAccessGroupById: '/api/user-group/info',
        addAccessGroup: '/api/user-group/add',
        editAccessGroup: '/api/user-group/update',
        deleteAccessGroup: '/api/user-group/delete',
        userGroup: '/api/user-group/all',
        getUserGroupRoles: '/api/user-group/get-roles',
        updateUserGroupRoles: '/api/user-group/update-roles',
        initOrganization: '/api/tuan-business/business-add',
        // 个人中心
        updatePassword:  '/api/user-company/update-password',
        getMyInfo: '/api/user-company/personal-info',
        updateMyInfo:  '/api/user-company/update-my-info',

        // 统计类
        statSummary: '/api/statistics/summary',
        // 数据统计
        listOrganizationKPI: '/api/statistics/kpi',
        listOrganizationTotalKPI: '/api/statistics/total-kpi',
        // 车展
        listExhibition: '/api/exhibition-coupon-activity/list',
        getExhibitionById: '/api/exhibition-coupon-activity/info',
        shareExhibitionQrcode: '/api/exhibition-coupon-activity/qrcode-share',
        listExhibitionOrder: '/api/exhibition-coupon-order/list',
        getExhibitionOrderById: '/api/exhibition-coupon-order/info',
        // 订单统计
        statExhibitionOrder: '/api/statistics/exhibition-orders',
        statExhibitionChannel: '/api/statistics/exhibition-channel-effect',

        //消息中心
        messageList: '/api/message/list',
        getMessageInfo: '/api/message/info',
        messageMarkRead: '/api/message/update',
        messagePull: '/api/message/pull',
        offlineAggregate: '/api/aggregate/offline',
        onlineAggregate: '/api/aggregate/online',
        refreshAggregate: '/api/aggregate/refresh',

        //优惠券活动管理
        listVoucherActivity: '/api/coupon-activity/list',
        addVoucherActivity: '/api/coupon-activity/add',
        getVoucherActivityById: '/api/coupon-activity/info',
        updateVoucherActivity: '/api/coupon-activity/update',
        deleteVoucherActivity: '/api/coupon-activity/delete',
        commitVoucherActivity: '/api/coupon-activity/commit',
        activityCouponQrcodeShare: '/api/coupon-activity/qrcode-share',
        //优惠券管理
        addVoucher: '/api/voucher/add',
        getVoucherById: '/api/voucher/info',
        updateVoucher: '/api/voucher/update',
        voucherList: '/api/voucher/list',
        deleteVoucher: '/api/voucher/delete',
        //优惠券订单管理
        voucherOrderList: '/api/voucher-order/list',
        getVoucherOrderById: '/api/voucher-order/info',
        voucherOrderCheckSale:'/api/voucher-order/check-sale',
        voucherClaimedStatistics: '/api/coupon-activity/statistics',
        voucherChannelStatistics: '/api/coupon-activity/channel-statistics',
        getFrequentLimit: '/api/system/get-frequent-limit',
        //优惠券订单退款管理
        refundOnline: '/api/voucher-order/refund-online',
        refundOffline: '/api/voucher-order/refund-offline',
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
        //支付中心
        enableService: '/api/pay/update-account',
        ennableAlipay: '/api/pay/update-ali-account',
        ennableWeixinpay: '/api/pay/apply-weixin-account',
        updateWeixinpay: '/api/pay/update-weixin-application',
        getPayAccount: '/api/pay/get-account',
        getWeixinApplyInfo: '/api/pay/get-weixin-apply-info',
        testPay: '/api/pay/test',
        updateAccountStatus: '/api/pay/update-account-status', // 小 停用
        //经纪人模块
        agentList: '/api/agent/list',
        getAgentInfoById: '/api/agent/info',
        agentIncomeList: '/api/agent-income/list',
        distributeAgent: '/api/agent/distribute',
        agentStatistics: '/api/agent/statistics',
        agentActivityStatistics: '/api/agent/activity-statistics',
        updateAgentStatus: '/api/agent/update-status',
        agentIncomeRank: '/api/agent-income/ranking',
        checkAgentIncome: '/api/agent-income/audit',
        withdrawList: '/api/agent-cash-withdraw/list',
        checkAgentWithdraw: '/api/agent-cash-withdraw/confirm',
        voucherOrderMakeDeal: '/api/activity-signup/make-deal'
    };

    var actionsConfig = [
        {
            type: 'bat-ria/mvc/NotFoundAction',
            path: '/404'
        },
        {
            type: 'bat-ria/mvc/ForbiddenAction',
            path: '/403'
        }
    ];

    var controller = require('er/controller');
    controller.registerAction(actionsConfig);

    require('./hook/patch');
    require('./hook/etpl.filter');
    require('./hook/vue');
    require('./hook/rule');
    require('./hook/highcharts.theme');
    // hook ajax
    // [不能放在init之前执行，否则会被bat-ria里面的hook覆盖] 暂时放到这里，有问题了，去修改bat-ria
    require('common/hook/ajax');

    // 配置统计
    var track = require('er-track').create();
    track.includeAll();
    if (/^cms\.babamaiche\.com$/.test(location.host) || /^yx\.chedamai\.cn$/.test(location.host)) {
        track.use('baidu').setAccount('');
    }
    else {
        track.use('console');
    }
    track.start();

    require('esui/Pager').defaultProperties = {
        pageSizes: [10, 15, 30, 50, 100]
    };

    var config = {
        // API配置
        api: apiConfig,

        // ER默认路径
        index: '/overview/stat',

        // 系统名称
        systemName: '车大卖 - 营销管理系统',
        // 关闭系统默认track
        ext: {
            track: false
        },
        hooks: {
            ADD_ER_REQUEST_HEADER: false,
            ADD_ADER_ID: false
        },
        // 导航栏
        nav: {
            navId: 'nav',
            tabs: require('./menu')
        }
    };

    return config;
});
