/**
 * Created by lifayu on 16/7/8.
 */
define(function (require) {
    var exports = {};

    /**
     * 后端接口
     * 这些接口会自动注入到Vue实例的`$api`中
     */
    exports.back = {
        user: '/api/agent/user-info',
        listMyOrganizations: '/api/agent/organizations',
        getAgentStatusByOrganizationId: '/api/agent/agent-auth',
        sendVerifyCode: '/api/sms/send-verification-code',
        login: '/api/site/login',
        logout: '/api/site/logout',
        register: '/api/site/register',
        checkWxSubscribe: '/api/site/check-subscribe',
        statistics: '/api/agent/statistics',
        listActivity: '/api/activity/list',
        listOrder: '/api/order/list',
        cashAward: '/api/award/cash',
        listOrganizationCashAward: '/api/award/cash-organizations',
        applyCashWithdraw: '/api/award/apply-cash-withdraw',
        listCashWithdraw: '/api/award/cash-withdraw-list',
        listVoucherAward: '/api/award/voucher',
        getVoucherOrderById: '/api/award/voucher-order',
        getOrganizationById: '/api/organization/info'
    };
    exports.api = {};

    /**
     * 前端页面路由配置
     */
    exports.front = {
        '/404': {
            component: {
                template: '<div style="margin: 20px 0; text-align: center;">Page Not Found!</div>'
            }
        },
        '/': {
            component: function (resolve) {
                require(['view/main/index'], resolve);
            }
        },
        '/register': {
            component: function (resolve) {
                require(['view/main/register'], resolve);
            }
        },
        '/login': {
            component: function (resolve) {
                require(['view/main/login'], resolve);
            }
        },
        '/activity/list': {
            component: function (resolve) {
                require(['view/activity/list'], resolve);
            }
        },
        '/award': {
            component: function (resolve) {
                require(['view/award/index'], resolve);
            },
            subRoutes: {
                '/cash': {
                    component: function (resolve) {
                        require(['view/award/cash/list'], resolve);
                    }
                },
                '/voucher': {
                    component: function (resolve) {
                        require(['view/award/voucher/list'], resolve);
                    }
                }
            }
        },
        '/award/cash/organization/:type': {
            component: function (resolve) {
                require(['view/award/cash/organization'], resolve);
            }
        },
        '/award/voucher/:orderId': {
            name: 'voucherDetail',
            component: function (resolve) {
                require(['view/award/voucher/detail'], resolve);
            }
        },
        '/award/cash/withdraw': {
            component: function (resolve) {
                require(['view/award/cash/withdraw'], resolve);
            }
        },
        '/award/cash/withdraw-list': {
            component: function (resolve) {
                require(['view/award/cash/withdrawList'], resolve);
            }
        },
        '/order/list': {
            component: function (resolve) {
                require(['view/order/list'], resolve);
            }
        },
        '/my': {
            component: function (resolve) {
                require(['view/my/index'], resolve);
            }
        },
        '/wx/subscribe': {
            component: function (resolve) {
                require(['view/wx/subscribe'], resolve);
            }
        }
    };
    return exports;
});
