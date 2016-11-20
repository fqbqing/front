/**
 * @file 进度条展示组件
 * @author lifayu
 */
define(
    function (require) {
        var u = require('underscore');
        var lib = require('esui/lib');
        var Control = require('esui/Control');

        /**
         * 进度条展示组件
         *
         * @extends Control
         * @constructor
         */
        function ProgressView(options) {
            Control.apply(this, arguments);
        }

        /**
         * 控件类型，始终为`"ProgressView"`
         *
         * @type {string}
         * @readonly
         * @override
         */
        ProgressView.prototype.type = 'ProgressView';

        /**
         * 创建控件主元素
         *
         * @param {Object} options 构造函数传入的参数
         * @return {HTMLElement}
         * @protected
         * @override
         */
        ProgressView.prototype.createMain = function (options) {
            if (!options.tagName) {
                return Control.prototype.createMain.call(this);
            }
            return document.createElement(options.tagName);
        };

        /**
         * 初始化参数
         *
         * @param {Object} [options] 构造函数传入的参数
         * @override
         * @protected
         */
        ProgressView.prototype.initOptions = function (options) {
            var properties = {
                value: 0
            };
            u.extend(properties, options);
            u.extend(this, properties);
        };

        ProgressView.prototype.initStructure = function () {
            var tpl = '<div class="' + this.helper.getPartClassName('value')
                + '" style="width:' + this.value + '%"></div>';
            this.main.innerHTML = tpl;
        };

        /**
         * 初始化事件交互
         *
         * @protected
         * @override
         */
        ProgressView.prototype.initEvents = function () {
        };

        ProgressView.prototype.setValue = function (value) {
            this.setProperties({
                value: value
            });
        };

        var paint = require('esui/painters');

        /**
         * 重渲染
         *
         * @method
         * @protected
         * @override
         */
        ProgressView.prototype.repaint = paint.createRepaint(
            Control.prototype.repaint,
            {
                name: 'value',
                paint: function (label, value) {
                    var item = lib.getChildren(label.main)[0];
                    item.style.width = value + '%';
                }
            }
        );

        lib.inherits(ProgressView, Control);
        require('esui/main').register(ProgressView);
        return ProgressView;
    }
);
