/**
 * Created by lifayu on 15/1/4.
 */
define(function (require) {

    var Vue = require('vue');
    var u = require('underscore');

    var $ = require('frozen');

    var View = require('saber-mm/View');

    var Resolver = require('saber-promise');

    var constants = require('../constants');

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

        // 支持MVVM双向绑定
        //this.vm = new Vue(u.extend(this.vueOptions, {
        //    el: this.main,
        //    data: data
        //}));
        var me = this;
        // 延迟执行，如果不延迟执行，自定义的Vue组件(ListView)的ready方法就不执行，具体原因目前未知
        setTimeout(function () {
            me.vm = new Vue({
                mixins: [me.vueOptions],
                el: me.main,
                data: data
            });
            me.vm.$view = me;
            // TODO 需要考虑cache的情况,cache的时候并不会dispose
            me.on('dispose', function () {
                if (me.vm) {
                    me.vm.$destroy(false, false);
                }
            });
        }, 0);
    };

    /**
     * 提示框
     *
     * @param {string} content 提示内容
     * @param {string} title 提示标题
     * @return {Promise}
     */
    View.prototype.waitAlert = function (content, title) {
        var resolver = new Resolver();
        var dia = $.dialog({
            title: title || '',
            content: content,
            button: ['确认']
        });
        dia.on('dialog:action', function (e) {
            resolver.resolve();
        });
        //dia.on('dialog:hide', function (e) {
        //    console.log("dialog hide")
        //});
        return resolver.promise();
    };

    /**
     * 消息确认框
     *
     * @param {string} content 提示内容
     * @param {string} title 提示标题
     * @return {Promise}
     */
    View.prototype.waitConfirm = function (content, title) {
        var resolver = new Resolver();
        var dia = $.dialog({
            title: title || '',
            content: content,
            button: ['确认', '取消']
        });

        dia.on('dialog:action', function (e) {
            if (e.index === 0) {
                resolver.resolve();
            }
            else {
                resolver.reject();
            }
        });
        //dia.on('dialog:hide', function (e) {
        //    console.log("dialog hide")
        //});
        return resolver.promise();
    };

    /**
     * 展示提示信息
     *
     * @param {string} content 提示内容
     * @param {string=} type 提示类型
     * @param {string=} time 时长,单位毫秒
     */
    View.prototype.showTip = function (content, type, time) {
        var el = $.tips({
            content: content,
            stayTime: time || 2000,
            type: type || 'success' // success / warn / info
        });
        //el.on('tips:hide', function () {
        //});
    };
});
