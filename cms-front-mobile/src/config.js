/**
 * @file 路由配置
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    return [
        {path: '/index', action: 'site/index'},
        {path: '/login', action: 'site/login'},
        {path: '/404', action: 'common/notFound'},
        {path: '/order/list', action: 'order/list'},
        {path: '/order/detail', action: 'order/detail'},
        {path: '/tuan/list', action: 'tuan/list'},
        {path: '/tuan/order/list', action: 'tuan/order/list'},
        {path: '/tuan/order/detail', action: 'tuan/order/detail'},
        {path: '/tuan/detail', action: 'tuan/detail'},
        {path: '/my/info', action: 'my/info', cached: true},
        {path: '/customer/list', action: 'customer/list'},
        {path: '/customer/detail', action: 'customer/detail'},
        {path: '/customer/track', action: 'customer/track'},
        {path: '/customer/public', action: 'customer/public'},
        {path: '/tuan/channel', action: 'tuan/channel'},
        {path: '/tuan/order/check', action: 'tuan/order/check'},
        {path: '/my/changepwd', action: 'my/changepwd'},
        {path: '/tuan/order/signin', action: 'tuan/order/signin'},
        {path: '/tuan/order/deal', action: 'tuan/order/deal'},
        {path: '/activities', action: 'site/activities'},
        {path: '/exhibition/list', action: 'exhibition/list'},
        {path: '/exhibition/detail', action: 'exhibition/detail'},
        {path: '/exhibition/order/list', action: 'exhibition/order/list'},
        {path: '/exhibition/channel', action: 'exhibition/channel'},
        {path: '/resetpassword', action: 'site/resetpassword'},
        {path: '/search', action: 'site/search'},
        {path: '/user-company/list', action: 'user-company/list'},
        {path: '/editItem', action: 'site/common/editItem'},
        {path: '/voucher/activity/list', action: 'voucher/activity/list'},
        {path: '/voucher/activity/detail', action: 'voucher/activity/detail'},
        {path: '/voucher/order/list', action: 'voucher/order/list'},
        {path: '/voucher/activity/channel', action: 'voucher/activity/channel'},
        {path: '/voucher/order/detail', action: 'voucher/order/detail'},
        {path: '/voucher/order/check', action: 'voucher/order/check'},
        {path: '/groupon/signup/list', action: 'groupon/signup/list'},
        {path: '/groupon/activity/detail', action: 'groupon/activity/detail'},
        {path: '/groupon/activity/list', action: 'groupon/activity/list'},
        {path: '/refund/index', action: 'refund/index'}
    ];

});
