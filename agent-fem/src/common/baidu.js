/**
 * Baidu-Track
 *
 * @file 百度统计追踪器
 * @author mfylee@163.com
 */
define(function (require) {
    // 初始化百度统计用全局数组
    if (!window._hmt) {
        window._hmt = [];
    }

    function loadScript(url, callback) {
        var script = document.createElement('script');
        script.charset = 'utf-8';
        script.async = true;
        script.src = url;

        if (callback) {
            var complete = false;
            script.onload = script.onreadystatechange = function () {
                if (!complete &&
                    (!this.readyState
                        || this.readyState === 'loaded'
                        || this.readyState === 'complete'
                    )
                ) {
                    complete = true;
                    callback();
                }
            };
        }

        var holder = document.getElementsByTagName('script')[0];
        if (holder && holder.parentNode) {
            holder.parentNode.insertBefore(script, holder);
        }
        else {
            var container =
                document.getElementsByTagName('head')[0] || document.body;
            container.insertBefore(script, container.firstChild);
        }
    }

    var exports = {name: 'baidu'};

    exports.create = function (config) {
        if (!config.account) {
            return;
        }

        var url = config.scriptURL || '//hm.baidu.com/hm.js';
        url += '?' + config.account;
        loadScript(url, null);

        if (config.router) {
            config.router.afterEach(function (transition) {
                var from = transition.from;
                var to = transition.to;
                var referrer = document.referrer;
                if (from && from.path) {
                    referrer = from.path;
                }
                window._hmt.push(['_setReferrerOverride', referrer]);
                window._hmt.push(['_trackPageview', to.path]);
            });
        }
    };

    return exports;
});
