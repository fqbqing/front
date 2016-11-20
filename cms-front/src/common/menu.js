/**
 * Created by lifayu on 16/1/8.
 */
define(function (require) {
    var u = require('underscore');

    var tabs = {
        cms: [{
            text: '首页',
            url: '/overview/stat',             // redirect using er/locator
            externalUrl: '',                    // redirect using url navigation
            include: [
                /^\/overview\/.+/
            ],
            exclude: [
                /^\/overview\/search.*/
                //'/validation/check/update'
            ],
            tabs: [{
                text: '<i class="icon-chart-bar"></i>数据统计',
                url: '/overview/stat'
            }, {
                text: '<i class="icon-th-thumb-empty"></i>在线活动',
                url: '/overview/index'
            }]
        },/*{
            text: '商品管理',
            url: '/good/list',
            include: [
                /^\/good\/.+/,
                /^\/image\/.+/
            ],
            auth: 'good',
            tabs: [{
                text: '<i class="icon-th-list"></i>商品列表',
                auth: 'good.list',
                url: '/good/list'
            },{
                text: '<i class="icon-plus"></i>添加商品',
                auth: 'good.add',
                url: '/good/add'
            },{
                text: '<i class="icon-th-list"></i>货品管理',
                auth: 'product.list',
                url: '/good/product/list'
            },{
                text: '<i class="icon-plus"></i>添加货品',
                auth: 'product.add',
                url: '/good/product/add'
            },{
                text: '<i class="icon-cubes"></i>商品分类管理',
                auth: 'category.list',
                url: '/good/category/list'
            },{
                text: '<i class="icon-cog-alt"></i>规格管理',
                auth: 'specification.list',
                url: '/good/specification/list'
            },{
                text: '<i class="icon-tags"></i>标签管理',
                auth: 'tag.list',
                url: '/good/tag/list'
            },{
                text: '<i class="icon-picture"></i>图片管理',
                url: '/image/list'
            }]
        },*/
           /* {
            text: '活动管理',
            url: '/activity/list',
            include: [
                /^\/activity\/.+/
            ],
            auth: 'activity',
            tabs: [{
                text: '<i class="icon-th-list"></i>活动列表',
                url: '/activity/list',
                auth: 'activity.list',
                include: [
                    /^\/activity\/good\/.+/
                ]
            },{
                text: '<i class="icon-th-list"></i>活动展示列表',
                auth: 'activity-show.list',
                url: '/activity/show/list'
            }]
        },*/
        //    {
        //    text: '交易管理',
        //    url: '/order/list',
        //    include: [
        //        /^\/order\/.+/
        //    ],
        //    auth: 'order|tuan-order',
        //    tabs: [{
        //        text: '<i class="icon-th-list"></i>活动订单列表',
        //        auth: 'tuan-order.list',
        //        url: '/order/tuan/list'
        //    }]
        //},
            {
            text: '活动管理',
            url: '/groupon/list',
            include: [
                /^\/tuan\/.+/,
                /^\/order\/tuan\/.+/,
                /^\/exhibition\/.+/,
                /^\/voucher\/.+/,
                /^\/groupon\/.+/
            ],
            auth: 'tuan|groupon-activity|tuan-order|exhibition-coupon-activity|exhibition-coupon-order|coupon-activity|voucher|voucher-order',
            tabs: [{
                text: '团购活动',
                auth: 'tuan|groupon-activity',
                tabs: [{
                    text: '<i class="icon-th-list"></i>团购列表',
                    auth: 'groupon-activity.list',
                    url: '/groupon/list'
                }, {
                    text: '<i class="icon-yen"></i>团购报名',
                    auth: 'activity-signup.list',
                    url: '/groupon/signup/list'
                }]
            }, {
                text: '优惠券活动',
                auth: 'coupon-activity|voucher|voucher-order',
                tabs: [{
                    text: '<i class="icon-th-list"></i>优惠券活动',
                    auth: 'coupon-activity',
                    url: '/voucher/activity/list'
                }, {
                    text: '<i class="icon-yen"></i>优惠券订单',
                    auth: 'voucher-order',
                    url: '/voucher/order/list'
                }]
            //}, {
            //    text: '平台活动',
            //    tabs: [{
            //        text: '<i class="icon-th-list"></i>车展列表',
            //        auth: 'exhibition-coupon-activity.list',
            //        url: '/exhibition/coupon/activity/list'
            //    }, {
            //        text: '<i class="icon-yen"></i>车展订单',
            //        auth: 'exhibition-coupon-order.list',
            //        url: '/exhibition/coupon/order/list'
            //    }]
            }, {
                text: '素材管理',
                auth: 'voucher',
                tabs: [{
                    text: '<i class="icon-ticket"></i>优惠券',
                    auth: 'voucher',
                    url: '/voucher/list'
                }]
            }]
        },{
            text: '客户管理',
            url: '/customer/list',
            include: [
                /^\/customer\/.+/,
                /^\/user\/customer\/.+/
            ],
            auth: 'customer',
            tabs: [{
                text: '<i class="icon-user"></i>客户列表',
                auth: 'customer.list',
                include: [
                    /^\/customer\/list/,
                    /^\/customer\/info/
                ],
                url: '/customer/list'
            }]
        },{
            text: '经纪人管理',
            url: '/agent/list',
            include: [
                /^\/agent\/.+/
            ],
            auth: 'agent',
            tabs: [{
                text: '<i class="icon-user"></i>经纪人列表',
                include: [
                    /^\/agent\/list/
                ],
                url: '/agent/list',
                auth: 'agent.list'
            },{
                text: '<i class="icon-chart-bar"></i>经纪人效果统计',
                include: [
                    /^\/agent\/statistics/
                ],
                url: '/agent/statistics',
                auth: 'agent.statistics'
            },{
                text: '<i class="icon-diamond"></i>经纪人奖励管理',
                include: [
                    /^\/agent\/income/
                ],
                url: '/agent/income',
                auth: 'agent-income.list'

            },{
                text: '<i class="icon-yen"></i>经纪人提现管理',
                include: [
                    /^\/agent\/withdraw/
                ],
                url: '/agent/withdraw',
                auth: 'agent-cash-withdraw.list'
            }]
        },
        //    {
        //    text: '权限管理',
        //    url: '/access/user/list',
        //    include: [
        //        /^\/access\/.+/
        //    ],
        //    auth: 'role',
        //    tabs: [{
        //    //    text: '<i class="icon-user"></i>用户管理',
        //    //    include: [
        //    //        /^\/access\/user\/.+/
        //    //    ],
        //    //    //auth: 'user-company.list',
        //    //    auth: 'role',
        //    //    url: '/access/user/list'
        //    //},{
        //    //    text: '<i class="icon-sitemap"></i>用户组管理',
        //    //    include: [
        //    //        /^\/access\/group\/.+/
        //    //    ],
        //    //    auth: 'role',
        //    //    //auth: 'user-group.list',
        //    //    url: '/access/group/list'
        //    //},{
        //        text: '<i class="icon-shield"></i>角色管理',
        //        include: [
        //            /^\/access\/role\/.+/
        //        ],
        //        auth: 'role.list',
        //        url: '/access/role/list'
        //    }]
        //},
            {
            text: '4S店管理',
            url: '/organization/init',
            include: [
                /^\/organization\/.+/
            ],
            auth: 'tuan-business|organization',
            tabs: [{
                text: '<i class="icon-cog"></i>初始化4S店',
                include: [],
                auth: 'tuan-business.business-add',
                url: '/organization/init'
            }, {
                text: '<i class="icon-cubes"></i>基本信息',
                include: [],
                url: '/organization/detail'
            }, {
                text: '<i class="icon-sitemap"></i>员工管理',
                include: [],
                url: '/organization/staff'
            }, {
                text: '<i class="icon-sitemap"></i>支付中心',
                include: [],
                url: '/organization/pay'
            }]
        }, {
            text: '个人中心',
            url: '/my/info',
            include: [
                /^\/my\/.+/
            ],
            tabs: [{
                text: '<i class="icon-info-circled-alt"></i>我的信息',
                url: '/my/info'
            }, {
                text: '<i class="icon-cog"></i>修改密码',
                url: '/my/changepwd'
            //}, {
            //    text: '<i class="icon-chat"></i>我的客户',
            //    url: '/my/customer'
            }]
        }, {
            text: '<span class="ui-badge-corner" id="message-center">消息中心</span>',
            url: '/message/index',
            include: [
                /^\/message\/.+/
            ]
            //tabs: [{
            //    text: '消息中心',
            //    url: '/message/index'
            //}]
        }],
        profile: [{
            text: '个人中心',
            url: '/my/info',
            include: [
                /^\/my\/.+/
            ],
            tabs: [{
                text: '<i class="icon-info-circled-alt"></i>我的信息',
                url: '/my/info'
            }, {
                text: '<i class="icon-cog"></i>修改密码',
                url: '/my/changepwd'
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