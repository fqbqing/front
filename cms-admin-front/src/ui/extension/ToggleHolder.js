/**
 * @file _public/ToggleHolder.js
 * 开关按钮扩展插件
 * @author chenqiang(chenqiang03@baidu.com)
 */

define(function (require) {
    var lib = require('esui/lib');
    var main = require('esui/main');
    var Extension = require('esui/Extension');

    /**
     * 开关按钮扩展插件
     *
     * 主要应用于 {@link ToggleButton} 条件性切换场景
     * @example
     *     当 ToggleButton 应用于服务启停时，需要先操作后置状态
     *     激活此扩展后可以通过 `Event.preventDefault()` 拦截 `ToggleButton:toggle`
     *     从而自行定义相关行为
     *
     * 插件启用相关设置 `data-ui-extension-toggleholder-type="ToggleHolder"`
     * @class extension.ToggleHolder
     * @extends Extension
     * @constructor
     */
    function ToggleHolder() {
        Extension.apply(this, arguments);
    }


    /**
     * 指定扩展类型，始终为 `ToggleHolder`
     *
     * @type {string}
     */
    ToggleHolder.prototype.type = 'ToggleHolder';

    /**
     * 插件激活
     * @override
     */
    ToggleHolder.prototype.activate = function () {
        var target = this.target;

        // 重写源组件的 `toggle` 方法，派发一个 'toggle' 事件
        // 方便对切换事件进行拦截
        target.toggle = function () {
            var toggleEvent = target.fire('toggle');

            if (!toggleEvent.isDefaultPrevented()) {
                target.set('checked', !this.checked);
            }
        };

        Extension.prototype.activate.apply(this, arguments);
    };

    lib.inherits(ToggleHolder, Extension);
    main.registerExtension(ToggleHolder);

    return ToggleHolder;
});

