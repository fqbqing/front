/**
 * 启用该扩展后，{@link Table}控件将可以在行内添加任意控件
 *
 * 托管所有子控件事件，统一派发给{@link Table}
 *
 * @file 表格行内任意组件扩展
 * @author 张浩(zhanghao25@baidu.com)
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
         * @extends Extension
         * @constructor
         */
        function TableChild() {
            Extension.apply(this, arguments);
        }


        /**
         * 指定扩展类型，始终为`"TableChild"`
         *
         * @type {string}
         */
        TableChild.prototype.type = 'TableChild';


        /**
         * 激活扩展
         *
         * @override
         */
        TableChild.prototype.activate = function () {
            var target = this.target;
            // 只对`Table`控件生效
            if (!(target instanceof Table)) {
                return;
            }

            function delegateChildEvent(e) {
                var event = require('mini-event').fromEvent(e, {
                    preserveData: true,
                    syncState: true
                });

                event.originControl = e.target;
                event.originType = e.type;

                target.fire('@childEvent', event);
            }

            target.on('bodyChange', function () {
                target.bodyPanel.disposeChildren();
                target.bodyPanel.destroyEvents();

                var options = {};
                var wrap = target.bodyPanel.main;

                options = target.bodyPanel.renderOptions;
                options.viewContext = target.bodyPanel.viewContext;
                options.parent = target.bodyPanel;

                // TODO 这个时候如果控件没有被require，则不能够初始化
                var children = ui.init(wrap, options);

                u.each(children, function (child) {

                    child.on('*', delegateChildEvent, this);
                });
            });


            Extension.prototype.activate.apply(this, arguments);
        };


        /**
         * 取消扩展的激活状态
         *
         * @override
         */
        TableChild.prototype.inactivate = function () {
            var target = this.target;
            // 只对`Table`控件生效
            if (!(target instanceof Table)) {
                return;
            }

            Extension.prototype.inactivate.apply(this, arguments);
        };


        lib.inherits(TableChild, Extension);
        main.registerExtension(TableChild);

        return TableChild;
    }
);
