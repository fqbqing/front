/**
 * Created by lifayu on 16/7/11.
 */
define(function (require) {

    var action = require('vuex/actions');

    var utils = require('utils');
    var u = require('underscore');
    var $ = require('zepto');

    var exports = {};

    exports.template = require('./register.tpl.html');

    exports.route = {
        data: function (transition) {
            var me = this;
        }
    };

    exports.datasource = {
        organization: function (route) {
            return this.$api.getOrganizationById({
                organizationId: route.query.organizationId
            });
        },
        agentStatus: function (route) {
            return this.$api.getAgentStatusByOrganizationId({
                organizationId: route.query.organizationId
            });
        }
    };

    exports.vuex = {
        getters: {
            user: function (state) {
                return state.user.value;
            }
        },
        actions: {
            registerAgent: action.registerAgent,
            fetchUser: action.fetchUser
        }
    };

    exports.data = function () {
        var user = this.user;
        return {
            formData: {
                name: user.name,
                phone: user.phone,
                code: ''
            }
        };
    };

    exports.computed = {
        isLogin: function () {
            return !!this.user.phone;
        }
    };

    exports.watch = {
        user: function (user) {
            this.formData.name = user.name;
            this.formData.phone = user.phone;
        }
    };

    function validateFormData(formData) {
        var data = {};
        var name = $.trim(formData.name);
        if (!name || name.length < 2) {
            $.toast('请正确填写姓名');
            return false;
        }
        data.name = name;
        var phone = $.trim(formData.phone);
        if (!utils.isPhoneValidate(phone)) {
            $.toast('请正确填写手机号');
            return false;
        }
        data.phone = phone;
        var code = $.trim(formData.code);
        if (!/^\d+$/.test(code)) {
            $.toast('请正确填写验证码');
            return false;
        }
        data.verifyCode = code;
        return data;
    }

    exports.methods = {
        register: function () {
            var me = this;
            var query = this.$route.query;
            var data = {
                organizationId: query.organizationId,
                source: query.source
            };
            if (!this.isLogin) {
                var formData = validateFormData(this.formData);
                if (!formData) {
                    return;
                }
                data = u.extend(formData, data);
            }
            this.registerAgent(data).then(function () {
                $.toast('注册成功', 1000);
                me.fetchUser().then(function () {
                    me.$router.replace('/');
                });
            });
        }
    };

    exports.components = {
    };

    exports.datasourced = function (data) {
        var me = this;
        if (data.agentStatus.auth) {
            $.toast('你已经代理过"' + data.organization.name + '"');
            setTimeout(function () {
                me.$router.replace('/');
            }, 2000);
        }
    };

    exports.ready = function () {
    };

    return exports;
});