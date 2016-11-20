/**
 * @file 入口模块
 * @author ()
 */

define(
    function (require) {
        var $ = require('jquery');
        var config = require('common/config');
        /**
         * 引入各业务模块的Action配置
         * 如果期望添加action时工具自动配置，请保持requireConfigs名称不变
         *
         * @ignore
         */
        function requireConfigs() {
            require('./agent/config');
            require('./groupon/signup/config');
            require('./groupon/config');
            require('./message/config');
            require('./voucher/order/config');
            require('./voucher/config');
            require('./voucher/activity/edit/config');
            require('./voucher/activity/config');
            require('./exhibition/coupon/order/config');
            require('./exhibition/coupon/activity/config');
            require('./user/customer/config');
            require('./organization/config');
            require('./organization/weixinpay/config');
            require('./organization/alipay/config');
            require('./tuan/edit/config');
            require('./access/role/config');
            require('./tuan/config');
            require('./image/config');
            require('./access/acl/config');
            require('./access/group/config');
            require('./access/user/config');
            require('./good/category/config');
            require('./overview/config');
            require('./customer/config');
            require('./order/tuan/config');
            require('./order/config');
            require('./activity/good/config');
            require('./activity/show/config');
            require('./activity/config');
            require('./good/tag/config');
            require('./good/specification/config');
            require('./good/product/config');
            require('./good/config');
            require('./my/config');
        }

        requireConfigs();

        function initGlobalSearch() {
            //headerSearch

            function search(keywords) {
                if (keywords) {
                    window.location.href = '#/overview/search~phone=' + encodeURIComponent(keywords);
                }
            }

            $('#headerSearch button').on('click', function () {
                var me = $(this).closest('.search');
                if (me.hasClass('search-active')) {
                    var input = me.find('input');
                    var value = $.trim(input.val());
                    if (!value) {
                        me.removeClass('search-active');
                    }
                    else {
                        search(value);
                    }
                }
                else {
                    me.addClass('search-active');
                    me.find('input').focus();
                }
            });
            $('#headerSearch input').on('keyup', function (e) {
                if (e.keyCode === 13) { // 回车搜索
                    var value = $.trim($(this).val());
                    search(value);
                }
            });
        }

        function enterDocument() {
            var message = require('common/message');
            setTimeout(function () {
                message.init({refresh: true});
            },500);
        }

        /**
         * 初始化UI，填写用户信息、初始化导航栏等
         *
         * @ignore
         */
        function init() {

            var user = require('bat-ria/system/user');
            var level = require('common/level');

            var visitor = user.visitor;

            level.init(visitor.organization.level_id, visitor.levelAuth);

            if (visitor) {
                if (visitor.avatar) {
                    $('.user-name img').attr('src',visitor.avatar);
                }
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

            initGlobalSearch();
            enterDocument();
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
    }
);
