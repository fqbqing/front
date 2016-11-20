/**
 * ESUI (Enterprise Simple UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 表格行内任意组件扩展
 * @author Guoyao Wu(wuguoyao@baidu.com)
 */
define(
    function (require) {
        var Extension = require('esui/Extension');
        var lib = require('esui/lib');
        var main = require('esui/main');
        var Table = require('esui/Table');
        var ui = require('esui');
        var u = require('underscore');

        /**
         * 表格行内任意组件扩展
         *
         * 启用该扩展后，{@link Table}控件将可以在行内添加任意控件
         *
         * 在控件值改变后，{@link Table}控件将触发对应组件类型的change事件，事件参数包括如下属性：
         *
         * - `{int} rowIndex`：对应行
         * - `{int} columnIndex`：对应列
         * - `{object} data`：对应的行数据对象
         * - `{object} itemRenderer`：对应的组件，如Select，TextBox等组件
         *
         * @class extension.TableEx
         * @extends Extension
         * @constructor
         */
        function TableEx() {
            Extension.apply(this, arguments);
        }

        /**
         * 指定扩展类型，始终为`"TableEx"`
         *
         * @type {string}
         */
        TableEx.prototype.type = 'TableEx';

        /**
         * 激活扩展
         *
         * @override
         */
        TableEx.prototype.activate = function () {
            var target = this.target;
            // 只对`Table`控件生效
            if (!(target instanceof Table)) {
                return;
            }


            var columnIndexes = target.columnRenderIndexes;
            if (typeof columnIndexes === 'number') {
                columnIndexes = [columnIndexes];
            }

            function initChildren(rowIndex, colIndex) {
                var cell = lib.g(target.getBodyCellId(rowIndex, colIndex));
                // src/helper/children.js#helper.initChildren
                var children = ui.init(cell, {
                    viewContext: target.viewContext,
                    valueReplacer: target.renderOptions.valueReplacer,
                    parent: target
                });

                u.each(children, function (child) {
                    var xEventType = child.get('xEventType');
                    if (!xEventType) {
                        return;
                    }

                    child.on(xEventType, function (e) {
                        var xFieldName = e.target.get('xFieldName');
                        var type = e.target.get('type');
                        var value;
                        if (xFieldName) {
                            // TODO 每个都是InputControl的子类么？
                            if (type === 'CheckBox') {
                                value = e.target.checked;
                            }
                            else {
                                value = e.target.getValue();
                            }
                            target.datasource[rowIndex][xFieldName] = value;
                        }

                        var xEventBubble = e.target.get('xEventBubble');
                        if (xEventBubble === 'true') {
                            target.fire(xEventType, {
                                bubble: true,
                                originalTarget: e.target
                            });
                        }
                    });
                });

                return children;
            }

            function onBodyChange(e) {
                var itemRenderers = [];
                u.each(target.datasource, function (_, rowIndex) {
                    u.each(columnIndexes, function (colIndex) {
                        var children = initChildren(rowIndex, colIndex);
                        itemRenderers.push.apply(itemRenderers, children);
                    });
                });
                target.itemRenderers = itemRenderers;
            }

            target.on('bodyChange', onBodyChange);

            Extension.prototype.activate.apply(this, arguments);
        };

        /**
         * 取消扩展的激活状态
         *
         * @override
         */
        TableEx.prototype.inactivate = function () {
            var target = this.target;
            // 只对`Table`控件生效
            if (!(target instanceof Table)) {
                return;
            }

            for (var i = target.itemRenderers.length - 1; i > -1; i--) {
                target.itemRenderers[i].dispose();
            }

            Extension.prototype.inactivate.apply(this, arguments);
        };

        lib.inherits(TableEx, Extension);
        main.registerExtension(TableEx);

        return TableEx;
    }
);
