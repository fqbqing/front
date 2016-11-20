/**
 * @file 全局加载进度器，单实例
 *
 * Created by lifayu on 15/1/20.
 */

define(function (require) {

    var $ = require('zepto');

    var timer = null;
    var timeoutTimer = null;

    var loading = new (function () {
        var me = this;

        me.rel = 0;

        me.delay = 0;

        me.timeout = 10000;

        me._init = function () {
            me.el = $('' +
                '<div class="ui-loading-mask"></div>' +
                '<div class="ui-loading-container">' +
                '   <div class="ui-loading"><i></i><i></i><i></i></div>' +
                '   <div class="ui-loading-text">加载中…</div>' +
                '</div>');
            me.isVisible = false;
            me.el.hide();
            $('body').append(me.el);
            me.isInit = true;
        };
        me.show = function () {
            if (!me.isInit) {
                me._init();
            }
            me.rel++;
//            if (!timer && !me.isVisible) {
//                timer = setTimeout(function () {
//                    console.log('show:' + me.rel);
//                    me.isVisible = true;
//                    me.el.show();
//                }, me.delay);
//            }
            me.isVisible = true;
            me.el.show();
            if (timeoutTimer) {
                clearTimeout(timeoutTimer);
            }
            timeoutTimer = setTimeout(function () {
                me.isVisible = false;
                me.el.hide();
                me.rel = 0;
            }, me.timeout);
        };
        me.hide = function () {
//            if (timer) {
//                clearTimeout(timer);
//                timer = null;
//            }
            me.rel--;
            if (me.isVisible) {
                if (me.rel === 0) {
                    if (timeoutTimer) {
                        clearTimeout(timeoutTimer);
                        timeoutTimer = null;
                    }
                    me.isVisible = false;
                    me.el.hide();
                }
            }
        };
    })();

    return loading;
});