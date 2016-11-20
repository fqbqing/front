/**
 * @file 入口模块
 * @author ()
 */

define(function (require) {
    var $ = require('jquery');
    var config = require('common/config');

    /**
     * 引入各业务模块的Action配置
     * 如果期望添加action时工具自动配置，请保持requireConfigs名称不变
     *
     * @ignore
     */
    function requireConfigs() {
        require('./organization/agent/config');
        require('./organization/refund/config');
        require('./organization/pay/config');
        require('./message/config');
        require('./activity/coupon/config');
        require('./activity/groupon/config');
        require('./order/voucher/config');
        require('./order/groupon/config');
        require('./mat/voucher/config');
        require('./aggregate/config');
        require('./brand/config');
        require('./location/config');
        require('./order/exihibition/config');
        require('./order/tuan/config');
        require('./organization/level/config');
        require('./organization/activity/exihibition/config');
        require('./organization/activity/tuan/config');
        require('./level/config');
        require('./organization/role/config');
        require('./staff/role/distribute/config');
        require('./staff/group/config');
        require('./staff/role/config');
        require('./staff/config');
        require('./organization/statistics/config');
        require('./organization/activity/config');
        require('./organization/staff/config');
        require('./organization/customer/config');
        require('./organization/config');
        require('./overview/config');
        require('./my/config');
    }

    requireConfigs();

    /**
     * 初始化UI，填写用户信息、初始化导航栏等
     *
     * @ignore
     */
    function init() {

        var user = require('bat-ria/system/user');
        var visitor = user.visitor;

        if (visitor) {
            $('.user-name span').text(visitor.name);
        }

        // 在这里用 visitor 信息初始化用户信息等 UI 元素
        // 以及自定义各种系统配置、导航栏等等

        // 首次登录，需要强制修改密码
        if (visitor.needPasswordChange) {
            window.location.href = '#/my/changepwd';
        }

        // 初始化主导航栏
        var nav = config.nav;
        if (nav && nav.navId && nav.tabs) {
            require('bat-ria/ui/navigator').init(nav.navId, nav.tabs.tab('cms'));
        }
        $('#launchScreen').remove();
    }

    /**
     * 启动RIA系统，请求关键数据等
     *
     * @ignore
     */
    function start() {
        require('bat-ria/main')
            .start(config)
            .then(init);

        require('bat-ria/tpl!./common.tpl.html');

        require('er/events').on('redirect', function (e) {
        });

        require('er/events').on('enteraction', function (e) {
        });

        require('er/events').on('enteractioncomplete', function (e) {
        });

        require('er/events').on('error', function (e) {
            //console.error(e.error);
        });

        // 拦截全局错误，做相应的跳转
        require('er/events').on('globalError', function (e) {
            var listUrl = '/';
            require('er/locator').redirect(listUrl);
        });
    }

    return {
        start: start
    };
});
