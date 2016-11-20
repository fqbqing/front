/**
 * ESUI (Enterprise Simple UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 表格行内下拉框
 * @author jianling(zhaochengyang@baidu.com)
 */
define(
    function (require) {
        var Extension = require('esui/Extension');
        var lib = require('esui/lib');
        // var helper = require('esui/controlHelper');
        var main = require('esui/main');
        var Table = require('esui/Table');
        var ui = require('esui');
        var u = require('underscore');

        /**
         * 表格行内下拉框扩展
         *
         * 启用该扩展后，{@link Table}控件将可以在行内添加Select控件
         *
         * 在{@link Table#fields}配置中，可编辑的字段有以下属性控制：
         *
         * - `{Object} selectObtions`：配置Select控件的选项
         *
         * 在Select值改变后，{@link Table}控件将触发selectChange事件，事件参数包括如下属性：
         *
         * - `{object} field`：对应的字段
         * - `{object} selectedItem`：select中选中的项
         *
         * @class extension.TableOperator
         * @extends Extension
         * @constructor
         */
        function TableOperator() {
            Extension.apply(this, arguments);
        }

        /**
         * 指定扩展类型，始终为`"TableOperator"`
         *
         * @type {string}
         */
        TableOperator.prototype.type = 'TableOperator';

        /**
         * 激活扩展
         *
         * @override
         */
        TableOperator.prototype.activate = function () {
            var target = this.target;
            // 只对`Table`控件生效
            if (!(target instanceof Table)) {
                return;
            }

            target.on('bodyChange', function(e){
                target.selectControls = [];

                u.each(target.datasource, function(item, rowIndex){
                    var cell = lib.g( target.getBodyCellId( rowIndex, target.operatorColumnIndex ) );
                    var ctls = ui.init(cell);
                    target.selectControls.push.apply(target.selectControls, ctls);
                    u.each(ctls, function(ctl){
                        ctl.on('click', function(e){
                            target.fire('operatorClick', {
                                action: e.target.action,
                                rowIndex: rowIndex,
                                data: item
                            });
                        });
                    });
                });
            });
            target.on('afterrowupdate', function(e){
                var rowIndex = e.index;
                var data = e.data;
                var cell = lib.g( target.getBodyCellId( rowIndex, target.operatorColumnIndex ) );
                var ctls = ui.init(cell);
                target.selectControls.push.apply(target.selectControls, ctls);
                u.each(ctls, function(ctl){
                    ctl.on('click', function(e){
                        target.fire('operatorClick', {
                            action: e.target.action,
                            rowIndex: rowIndex,
                            data: data
                        });
                    });
                });
            });
            Extension.prototype.activate.apply(this, arguments);
        };

        /**
         * 取消扩展的激活状态
         *
         * @override
         */
        TableOperator.prototype.inactivate = function () {
            var target = this.target;
            // 只对`Table`控件生效
            if (!(target instanceof Table)) {
                return;
            }

            for(var i=0; i<target.selectControls.length; i++) {
                target.selectControls[i].dispose();
            }

            Extension.prototype.inactivate.apply(this, arguments);
        };

        lib.inherits(TableOperator, Extension);
        main.registerExtension(TableOperator);

        return TableOperator;
    }
);
