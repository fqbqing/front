/**
 * Created by lifayu on 16/1/8.
 */
define(function (require) {
    var u = require('underscore');
    var tabs = {
        cms: [{
            text: '数据统计',
            url: '/overview/index',             // redirect using er/locator
            externalUrl: '',                    // redirect using url navigation
            include: [
                /^\/overview\/.+/
            ],
            exclude: [
                //'/validation/check/update'
            ],
            auth: 'organization',
            tabs: [{
                text: '<i class="icon-chart-bar"></i>数据概览',
                url: '/overview/index',
                auth: 'organization'
            }]
        }, {
            text: '加盟店管理',
            url: '/organization/list',
            include: [
                /^\/organization\/.+/,
                /^\/level\/.+/
            ],
            auth: 'organization|role|level|refund',
            tabs: [{
                text: '<i class="icon-th-list"></i>加盟店列表',
                url: '/organization/list',
                auth: 'organization'
            }, {
                text: '<i class="icon-plus"></i>新增加盟店',
                url: '/organization/add',
                auth: 'organization.add'
            }, {
                text: '<i class="icon-shield"></i>角色管理',
                url: '/organization/role/list',
                auth: 'role'
            }, {
                text: '<i class="icon-flag"></i>级别管理',
                include: [
                    /^\/level\/.+/
                ],
                url: '/level/list',
                auth: 'level'
            }, {
                text: '<i class="icon-yen"></i>退款管理',
                include: [
                    /^\/refund\/.+/
                ],
                url: '/organization/refund/list',
                auth: 'refund'
            }]
        },{
            text: '活动管理',
            url: '/activity/groupon/list',
            include: [
                /^\/activity\/.+/,
                /^\/voucher\/.+/,
                /^\/order\/.+/
            ],
            auth: 'groupon-activity|tuan|voucher|coupon-activity|exhibition-coupon-activity',
            tabs: [{
                text: '<i class="icon-th-list"></i> 新版团购活动',
                url: '/activity/groupon/list',
                auth: 'groupon-activity'
            }, {
                text: '<i class="icon-th-list"></i> 旧版团购活动',
                url: '/activity/tuan/list',
                auth: 'tuan'
            }, {
                text: '<i class="icon-th-list"></i> 优惠券',
                url: '/voucher/list',
                auth: 'voucher'
            }, {
                text: '<i class="icon-th-list"></i> 优惠券活动',
                url: '/activity/coupon/list',
                auth: 'coupon-activity'
            }, {
                text: '<i class="icon-th-list"></i> 车展活动',
                url: '/activity/exihibition/list',
                auth: 'exhibition-coupon-activity'
            }]
        }, {
            text: '权限管理',
            url: '/access/user/list',
            include: [
                /^\/staff\/.+/
            ],
            auth: 'staff|staff-group|staff-role',
            tabs: [{
                text: '<i class="icon-user"></i>员工管理',
                url: '/staff/index',
                auth: 'staff|staff-group'
            }, {
                text: '<i class="icon-shield"></i>角色管理',
                url: '/staff/role/list',
                include: [
                    /^\/staff\/role\/.+/
                ],
                auth: 'staff-role'
            }]
        }, {
            text: '个人中心',
            url: '/my/info',
            include: [
                /^\/my\/.+/
            ],
            auth: 'staff',
            tabs: [{
                text: '<i class="icon-info-circled-alt"></i>我的信息',
                url: '/my/info',
                auth: 'staff'
            }, {
                text: '<i class="icon-cog"></i>修改密码',
                url: '/my/changepwd',
                auth: 'staff'
            }]
        }, {
            text: '公告管理',
            url: '/message/index',
            include: [
                /^\/message\/.+/
            ],
            auth: 'message-job',
            tabs: [{
                text: '公告管理',
                url: '/message/index',
                auth: 'message-job'
            }]
        },{
            text: '聚合推广管理',
            url: '/aggregate/ad',
            include: [
                /^\/aggregate\/.+/
            ],
            auth: 'ad|aggregate',
            tabs: [{
                text: '<i class="icon-th-list"></i>广告位管理',
                url: '/aggregate/ad',
                auth: 'ad'
            }, {
                text: '<i class="icon-th-list"></i>人工排序管理',
                url: '/aggregate/index',
                auth: 'aggregate'
            }]
        }]
    };

    /**
     * 默认将自身的url添加到`include`中
     *
     * @return {Array}
     */
    function init(page) {
        function fixInclude(tab) {
            if (tab.tabs && tab.tabs.length) {
                tab.tabs = u.map(tab.tabs, function (t) {
                    t.include = t.include || [];
                    if (t.url) {
                        t.include.push(t.url);
                    }
                    fixInclude(t);
                    return t;
                });
            }
        }
        return u.map(tabs[page], function (tab) {
            tab.include = tab.include || [];
            if (tab.url) {
                tab.include.push(tab.url);
            }
            fixInclude(tab);
            return tab;
        });
    }
    return {
        tab: init
    };
});