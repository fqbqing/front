/**
 * Created by lifayu on 16/7/11.
 */
define(function (require) {

    var action = require('vuex/actions');

    var utils = require('utils');
    var $ = require('zepto');

    var exports = {};

    exports.template = require('./login.tpl.html');

    exports.route = {
        data: function (transition) {
        }
    };

    exports.datasource = {
        formData: function (route) {
            var user = this.user;
            return {
                phone: user.phone,
                code: '',
                name: ''
            }
        },
        isExist: true
    };

    exports.vuex = {
        getters: {
            user: function (state) {
                return state.user.value;
            }
        },
        actions: {
            loginUser: action.loginUser,
            fetchUser: action.fetchUser
        }
    };

    function validateFormData(formData, isExist) {
        var data = {};
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
        if (!isExist) {
            var name = $.trim(formData.name);
            if (name.length === 0) {
                $.toast('请填写真实姓名');
                return;
            }
            data.name = name;
        }
        return data;
    }

    exports.methods = {
        login: function () {
            var me = this;
            var formData = validateFormData(this.formData, me.isExist);
            if (!formData) {
                return;
            }
            this.loginUser(formData).then(function () {
                $.toast('登录成功', 1000);
                me.fetchUser().then(function () {
                    me.$router.replace(decodeURIComponent(me.$route.query.url || '/'));
                });
            });
        }
    };

    exports.components = {
    };

    exports.ready = function () {
        if (this.user && this.user.phone) {
            this.$router.replace(decodeURIComponent(this.$route.query.url || '/'));
        }
    };

    return exports;
});