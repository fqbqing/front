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
        user: '/api/staff/session',
        constants: '/api/system/constants',
        // 个人中心
        updatePassword: '/api/staff/update-password',
        getMyInfo: '/api/staff/personal-info',
        // 数据统计
        listOrganizationStatistics: '/api/organization/statistics',
        listOrganizationKPI: '/api/organization/kpi',
        //客户管理
        listCustomer: '/api/customer/list',
        getCustomerById: '/api/customer/info',
        allRating: '/api/customer/all-ratings',
        getCustomerTrack: '/api/customer-track/list',
        // 内部员工角色管理
        listStaffAcl: '/api/staff-acl/get-all',
        getAllStaffDataPermissions: '/api/staff-acl/get-all-data-permissions',
        listStaffRole: '/api/staff-role/list',
        addStaffRole: '/api/staff-role/add',
        deleteStaffRole: '/api/staff-role/delete',
        getStaffRoleById: '/api/staff-role/info',
        updateStaffRolePermissions: '/api/staff-role/update-permissions',
        getStaffRolePermissions: '/api/staff-role/get-permissions',
        //getStaffDataPermissions: '/api/staff-role/get-data-permissions',
        //updateStaffDataPermissions: '/api/staff-role/update-data-permissions',
        // 4S店角色管理
        listOrganizationAcl: '/api/acl/get-all',
        getAllOrganizationDataPermissions: '/api/acl/get-all-data-permissions',
        listOrganizationRole: '/api/role/list',
        addOrganizationRole: '/api/role/add',
        updateOrganizationRole: '/api/role/update',
        deleteOrganizationRole: '/api/role/delete',
        getOrganizationRoleById: '/api/role/info',
        updateOrganizationRolePermissions: '/api/role/update-permissions',
        getOrganizationRolePermissions: '/api/role/get-permissions',
        getOrganizationDataPermissions: '/api/role/get-data-permissions',
        updateOrganizationDataPermissions: '/api/role/update-data-permissions',
        // 员工管理
        listStaff: '/api/staff/list',
        getStaffById: '/api/staff/info',
        addStaff: '/api/staff/add',
        editStaff: '/api/staff/update',
        deleteStaff: '/api/staff/delete',
        getStaffRoles: '/api/staff/get-roles',
        updateStaffRoles: '/api/staff/update-roles',
        // 员工组管理
        staffGroupTree: '/api/staff-group/get-organization-tree',
        listStaffGroup: '/api/staff-group/list',
        getStaffGroupById: '/api/staff-group/info',
        addStaffGroup: '/api/staff-group/add',
        editStaffGroup: '/api/staff-group/update',
        deleteStaffGroup: '/api/staff-group/delete',
        getStaffGroupRoles: '/api/staff-group/get-roles',
        updateStaffGroupRoles: '/api/staff-group/update-roles',
        // 4S员工管理
        listUserCompany: '/api/user-company/list',
        getUserCompanyById: '/api/user-company/info',
        getUserCompanyRoles: '/api/user-company/get-roles',
        // 4S员工组管理
        userGroupTree: '/api/user-group/get-organization-tree',
        listUserGroup: '/api/user-group/list',
        getUserGroupById: '/api/user-group/info',
        addUserGroup: '/api/user-group/add',
        editUserGroup: '/api/user-group/update',
        deleteUserGroup: '/api/user-group/delete',
        getUserGroupRoles: '/api/user-group/get-roles',
        updateUserGroupRoles: '/api/user-group/update-roles',
        // 加盟店管理
        addOrganization: '/api/organization/add',
        getOrganizationById: '/api/organization/info',
        deleteOrganization: '/api/organization/delete',
        initOrganization: '/api/organization/init',
        listOrganization: '/api/organization/list',
        updateOrganization: '/api/organization/update',
        updateOrganizationLevel: '/api/organization/update-level-info',
        listBrand: '/api/organization/get-brands',
        locationTree: '/api/organization/location-tree',
        //团购管理
        listTuan: '/api/tuan/list',
        getTuanById: '/api/tuan/info',
        listTuanOrder: '/api/tuan-order/list',
        //车展管理
        listExhibition: '/api/exhibition-coupon-activity/list',
        getExhibitionById: '/api/exhibition-coupon-activity/info',
        listExhibitionOrder: '/api/exhibition-coupon-order/list',
        // 级别管理
        listLevel: '/api/level/list',
        addLevel: '/api/level/add',
        updateLevel: '/api/level/update',
        deleteLevel: '/api/level/delete',
        getLevelById: '/api/level/info',
        getLevelPermissions: '/api/level/get-permissions',
        updateLevelPermissions: '/api/level/update-permissions',
        getLevelDataPermissions: '/api/level/get-data-permissions',
        updateLevelDataPermissions: '/api/level/update-data-permissions',
        getLevelDataLimits: '/api/level/get-data-limits',
        updateLevelDataLimits: '/api/level/update-data-limits',
        getAllLevelDataPermissions: '/api/acl/get-all-level-data-permissions',
        getAllLevelDataLimits: '/api/acl/get-all-level-data-limits',
        //消息管理
        messageJobList: '/api/message-job/list',
        getMessageJobInfo: '/api/message-job/info',
        //addMessageJob: '/api/message-job/add',
        sendMessageJob: '/api/message-job/send',
        saveMessageJob: '/api/message-job/save',
        //草稿管理
        sendMessageJobGraft: '/api/message-job/draft-send',
        messageJobDraftList: '/api/message-job/draft-list',
        getMessageJobDraftInfo: '/api/message-job/draft-info',
        updateMessageJobGraft: '/api/message-job/draft-update',

        updateOrganizationBrands: '/api/organization/update-brands',
        //聚合推广管理
        advertiseList: '/api/ad/list',
        deleteAdvertise: '/api/ad/delete',
        getAdvertiseInfoById: '/api/ad/info',
        addAdvertise: '/api/ad/add',
        updateAdvertise: '/api/ad/update',
        aggregateList: '/api/aggregate/list',
        updateAggregate: '/api/aggregate/update',
        //优惠券活动管理
        listVoucherActivity: '/api/coupon-activity/list',
        getVoucherActivityById: '/api/coupon-activity/info',
        //优惠券管理
        voucherList: '/api/voucher/list',
        //优惠券订单管理
        voucherOrderList: '/api/voucher-order/list',
        //支付中心
        getPayAccount: '/api/pay/get-account',
        getWeixinApplyInfo: '/api/pay/get-weixin-apply-info',
        updateWeixinAccount: '/api/pay/update-weixin-account',
        // 新团购 (Groupon)
        listGroupon: '/api/groupon-activity/list',
        getGrouponById: '/api/groupon-activity/info',
        grouponSignupList: '/api/activity-signup/groupon-list',
        refundList: '/api/refund/list',
        addRefund: '/api/refund/add',
        deleteRefund: '/api/refund/delete',
        //经纪人管理
        agentList: '/api/agent/list'
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
    require('./ueditorConfig');

    // hook ajax
    // [不能放在init之前执行，否则会被bat-ria里面的hook覆盖] 暂时放到这里，有问题了，去修改bat-ria
    require('common/hook/ajax');

    require('ui-vue/main');

    // 配置统计
    var track = require('er-track').create();
    track.includeAll();
    if (/^boss\.chedamai\.cn$/.test(location.host)) {
        track.use('baidu').setAccount('');
        document.domain = 'chedamai.cn';
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
        index: '/overview/index',

        // 系统名称
        systemName: '车大卖 - 超级管理端',
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
