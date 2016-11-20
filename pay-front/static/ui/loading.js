
(function ($) {
    var timer = null;
    var timeoutTimer = null;

    var loading = new (function () {
        var me = this;

        me.rel = 0;

        me.delay = 0;

        me.timeout = 20000;

        me._init = function () {
            me.el = $('' +
                '<div class="ui-loading-mask"></div>' +
                '<div class="ui-loading-container">' +
                '   <div class="ui-loading-box">' +
                '       <div class="ui-loading"></div>' +
                '       <div class="ui-loading-text">加载中…</div>' +
                '   </div>' +
                '</div>');
            me.isVisible = false;
            me.el.hide();
            $('body').append(me.el);
            me.isInit = true;
        };
        me.show = function (text) {
            if (!me.isInit) {
                me._init();
            }
            me.el.find('.ui-loading-text').text(text);
            me.rel++;
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

    window.YJ = window.YJ || {};

    YJ.loading = loading;
})(jQuery);