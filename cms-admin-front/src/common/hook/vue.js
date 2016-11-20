/**
 * @file vue自定义扩展
 * @author lifayu@baidu.com
 */

define(function (require) {

    var Vue = require('vue');
    var esui = require('esui');
    var ViewContext = require('esui/ViewContext');
    var u = require('underscore');
    var utils = require('common/utils');
    var cons = require('common/constants');
    var user = require('bat-ria/system/user');

    Vue.config.debug = true;

    /**
     * Vue全局混合
     */
    Vue.mixin({
        methods: {
            isAllow: function (name) {
                return user.isAllow(name);
            }
        }
    });

    function destroyControlByDom(dom) {
        if (!dom) {
            return;
        }
        var getConf = esui.getConfig;

        var controlId = dom.getAttribute(getConf('instanceAttr'));
        var viewContextId = dom.getAttribute(getConf('viewContextAttr'));
        var viewContext;

        if (controlId
            && viewContextId
            && (viewContext = ViewContext.get(viewContextId))
        ) {
            var control = viewContext.get(controlId);
            if (control) {
                control.dispose();
            }
        }
        else {
            var children = dom.childNodes;
            u.each(u.filter(children, function (child) {
                return child.nodeType === 1;
            }), destroyControlByDom);
        }
    }

    Vue.directive('esui', {
        twoWay: true,
        bind: function () {
            var me = this;
            this.vm.$nextTick(function () {
                var c = esui.getControlByDOM(me.el);
                if (c) {
                    c.on('change', function (e) {
                        me.set(c.getRawValue());
                    });
                }
            });
        },
        update: function (value) {
            var c = esui.getControlByDOM(this.el);
            c && c.setValue(value);
        }
    });

    Vue.component('esuibox', {
        replace: true,
        template: '<div><slot></slot></div>',
        ready: function () {
            var root = this.$root;
            var options = {};
            var view = root.$view;
            if (view) {
                options = {
                    viewContext: view.viewContext,
                    properties: view.getUIProperties(),
                    valueReplacer: u.bind(view.replaceValue, view)
                };
                esui.init(this.$el, options);
            }
        },
        beforeDestroy: function () {
            destroyControlByDom(this.$el);
        }
    });
    Vue.component('staff-item', {
         replace: true,
         template: '<li>' +
                        '<div :class="{folder: isFolder,active: state.selectedId==model.id}"  class="group-item" @click="getGroupStaff">' +
                            '<span class="group-item-gap" :style="{width:level*15 + \'px\'}"></span>' +
                            //'<span class="group-item-icon" @click="toggle" :class="{slideDown: open,slideUp: !isFolder}"></span>' +
                            '<span class="group-item-icon" title="展开/收起" @click="toggle" :class="{\'icon-down-open\':isFolder&&open,\'icon-right-open\':isFolder&&!open,\'icon-direction-1\':!isFolder}"></span>' +
                            '<span>{{model.name}}</span>' +
                            '<div class="group-oper" v-if="model.id!=state.topGroup.id">' +
                            '<a href="javascript:void(0)" @click="updateGroup" v-if="model.parent_id!=state.topGroup.id && isAllow(groupType + \'.update\')">修改</a>' +
                            '<a href="javascript:void(0)" @click="deleteGroup" v-if="model.parent_id!=state.topGroup.id && isAllow(groupType + \'.delete\')">删除</a>' +
                            '<a href="javascript:void(0)" @click="updateGroupRole" v-if="groupType!=\'user-group\' && isAllow(groupType + \'.update-roles\')">角色分配</a></div>'+
                        '</div>' +
                        '<ul v-show="open" v-if="isFolder">' +
                            '<staff-item v-for="model in model.children" :group-type="groupType" :level="level+1" :model="model" :state="state"></staff-item>' +
                        '</ul>' +
                    '</li>',
         props: {
             model: Object,
             state: Object,
             level: Number,
             groupType: {
                 type: String,
                 raw: 'user-group'
             }
         },
         data: function () {
            return {
                open: false
            }
         },
         computed: {
             isFolder: function () {
                 return this.model.children && this.model.children.length;
             }
         },
        ready: function () {
            this.level = this.level || 0;
            this.$nextTick(function () {
                this.open = this.level < 2;
            });
        },
         methods: {
            toggle: function (e) {
                e.stopPropagation();
                if (this.isFolder) {
                    this.open = !this.open
                }
            },
            getGroupStaff: function (e) {
                e.stopPropagation();
                this.state.selectedId = this.model.id;
                this.$dispatch('get-group-staff', this);
            },
            updateGroup: function (e) {
                e.stopPropagation();
                this.$dispatch('updateGroup', this);
            },
            deleteGroup: function(e){
                e.stopPropagation();
                this.$dispatch('deleteGroup', this);
            },
            updateGroupRole: function (e) {
                e.stopPropagation();
                this.$dispatch('updateGroupRole', this);
            }
         },
         events: {
            'open-folder': function (item) {
            }
         }
    });

    /**
     * 当变量不存在时指定默认值
     */
    Vue.filter('dft', function (value, dft) {
        return value || dft;
    });

    Vue.filter('date', function(value, formatrer){
        return utils.dateFormat(value, formatrer);
    });
    Vue.filter('keyToValue', function(key){
        var item = u.find(cons.CUSTOMER_RATING,function(item){
            return item.value === key;
        });
        var text = item ? item.text : '';
        return text;
    });

    Vue.filter('reverse', function (array) {
        if (u.isArray(array)) {
            return array.reverse();
        }
        return array;
    });

    /**
     * 截取字符串首字母
     */
    Vue.filter('first-letter', function (value) {
        var ret = '';
        if (typeof value === 'string' && value.length > 0) {
            ret = value[0];
        }
        return ret;
    });

    Vue.filter('ad_place_format', function(key ,list){
        return utils.translateToValue(key,list);

    });
    Vue.filter('province_format', function(key ,list){
        return utils.provinceFormat(key,list);

    });
    Vue.filter('imgUrl', function (url, width, height) {
        return utils.imgUrl(url, width, height);
    });

    Vue.filter('voucher-order-status', function (value) {
        return utils.getVoucherOrderStatus(value);
    });
    Vue.filter('voucher-payment-type', function (value) {
        return utils.getVoucherPayments(value);
    });
    Vue.filter('amount', function (value) {
        return utils.getAmount(value);
    });
    Vue.filter('capitalMoney', function (num) {
        return utils.capitalMoney(num);
    });

});