/**
 * ER-Track
 * Copyright 2013 Baidu Inc. All rights reserved.
 * 
 * @file 百度统计追踪器
 * @author otakustay
 */
define(
    function (require) {
        function logLine(entries) {
            if (!window.console) {
                return;
            }

            // IE的`console.log`不是函数，不支持`apply`，且不支持多个参数
            if (typeof console.log === 'function') {
                console.log.apply(console, entries);
            }
            else {
                console.log(entries.join(' '));
            }
        }

        function logWithGroup(groupName) {
            if (!window.console) {
                return;
            }
            
            if (console.groupCollapsed) {
                console.groupCollapsed(groupName);
                for (var i = 1; i < arguments.length; i++) {
                    logLine(arguments[i]);
                }
                console.groupEnd(groupName);
            }
            else {
                console.log('➤' + groupName);
                var prefix = '├───';
                for (var i = 1; i < arguments.length; i++) {
                    if (i === arguments.length - 1) {
                        prefix = '└───';
                    }
                    var entry = arguments[i];
                    if (typeof entry === 'string') {
                        entry = prefix + entry;
                    }
                    else {
                        entry[0] = prefix + entry[0];
                    }
                    logLine(entry);
                }
            }
        }

        var exports = { name: 'console' };

        exports.create = function (config) {
            return {
                name: 'console',

                trackException: function (context) {
                    var route = context.route;
                    var action = context.action;
                    logWithGroup(
                        '进入页面出错了："' + route.url + '"',
                        ['Action：', action],
                        ['Model：', action.model],
                        ['Model里的数据：', JSON.parse(JSON.stringify(action.model.store))],
                        ['View：', action.view],
                        ['DOM容器：', action.view.main]
                    );
                },

                trackEnterAction: function (context) {
                    var route = context.route;
                    var action = context.action;
                    logWithGroup(
                        '亲你正在进入"' + route.url + '"',
                        ['Action：', action],
                        ['Model：', action.model],
                        ['Model里的数据：', JSON.parse(JSON.stringify(action.model.store))],
                        ['View：', action.view],
                        ['DOM容器：', action.view.main]
                    );
                },

                load: function (callback) {
                    callback();
                }
            };
        };

        return exports;
    }
);
