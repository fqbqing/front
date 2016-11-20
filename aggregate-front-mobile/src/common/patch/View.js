/**
 * Created by lifayu on 15/1/4.
 */
define(function (require) {

    var View = require('saber-mm/View');

    /**
     * Vue初始化配置
     *
     * @type {Object}
     */
    View.prototype.vueOptions = {};

    /**
     * 渲染视图
     *
     * @public
     * @param {Object} data 模版数据
     *
     * @fires View#beforerender
     *        View#afterrender
     */
    View.prototype.render = function (data) {
        if (!this.main) {
            return;
        }

        // 设置className，避免重复
        var classes = this.main.className.split(/\s+/);
        if (this.className && classes.indexOf(this.className) < 0) {
            this.main.className += ' ' + this.className;
        }

        /**
         * 渲染前事件
         *
         * @event
         * @param {Object} 渲染数据
         */
        this.emit('beforerender', data);

        this.main.innerHTML = this.template.render(this.templateMainTarget, data);
        /**
         * 渲染后事件
         *
         * @event
         * @param {Object} 渲染数据
         */
        this.emit('afterrender', data);
    };

});
