/**
 * Created by lifayu on 15/1/4.
 */
define(function (require) {

    var Vue = require('vue');
    var Vuex = require('vue/vuex');
    var u = require('underscore');
    var Presenter = require('saber-mm/Presenter');

    var ActionView = require('./ActionView');

    Presenter.prototype.actions = {};

    Presenter.prototype.injectVue = function () {
        var me = this;
        var getters = {};
        u.each(this.model.getters(), function (item) {
            getters[item] = function (state) {
                return state[item];
            };
        });
        me.vue = new Vue({
            mixins: [me.view.vueOptions],
            el: me.view.main,
            store: new Vuex.Store({
                state: this.model.store,
                mutations: this.model.mutations
            }),
            vuex: {
                actions: this.actions,
                getters: getters
            },
            ready: function () {

            }
            //data: me.model.store
        });
        me.vue.context = me;
        me.view.vue = me.vue;
        me.view.on('dispose', function () {
            if (me.vue) {
                me.vue.$destroy(false, false);
            }
        });
    };

    /**
     * 页面就绪
     * 进行DOM事件注册
     *
     * @public
     */
    Presenter.prototype.ready = function () {
        this.injectVue();

        this.emit('ready');
        this.view.ready();
    };

    /**
     * 页面苏醒
     *
     * @public
     */
    Presenter.prototype.revived = function () {
        this.injectVue();

        this.emit('revived');
        this.view.revived();
    };
});
