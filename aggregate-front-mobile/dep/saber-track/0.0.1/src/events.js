/**
 * ER-Track
 * Copyright 2013 Baidu Inc. All rights reserved.
 * 
 * @ignore
 * @file 各事件处理函数
 * @author otakustay
 */
define(
    function (require) {

        return {
            pageView: function (track) {
                require('saber-firework').on(
                    'afterload',
                    function (cur, prev) {
                        track(['trackPageView', [cur, prev]]);
                    }
                );
            },
            //
            //exception: function (track) {
            //    require('er/Deferred').on(
            //        'exception',
            //        function (e) {
            //            track(['trackException', [e]]);
            //        }
            //    );
            //},
            //
            //requestTimeout: function (track) {
            //    require('er/ajax').on(
            //        'timeout',
            //        function (e) {
            //            var args = [
            //                e.options.url,
            //                e.options
            //            ];
            //            track(['trackRequestTimeout', args]);
            //        }
            //    );
            //},
            //
            enterAction: function (track) {
                require('saber-firework').on(
                    'afterload',
                    function (cur, prev) {
                        track(['trackEnterAction', [cur]]);
                    }
                );
            },
            exception: function (track) {
                require('saber-firework').on(
                    'error',
                    function (cur, prev) {
                        track(['trackException', [cur]]);
                    }
                );
            }
            //
            //leaveAction: function (track) {
            //    require('er/events').on(
            //        'leaveaction',
            //        function (e) {
            //            track(['trackLeaveAction', [e]]);
            //        }
            //    );
            //}
        };
    }
);
