/**
 * Created by lifayu on 16/1/11.
 */

define(function (require) {

    var Vue = require('vue');

    var $ = require('jquery');

    var VERIFY_CODE_INTERVAL = 60;
    var phoneRegex = /^1[3|4|5|7|8]\d{9}$/;

    $.ajaxSetup({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name=_csrf]').attr('content'));
        }
    });

    var vm = null;

    function showMessage(message) {
        vm.message = message;
        vm.showError = true;
        setTimeout(function () {
            vm.showError = false;
        }, 2000);
    }

    function submit() {
        var phone = $.trim(this.phone);
        var password = $.trim(this.password);
        if (phone.length === 0) {
            showMessage('手机号不能为空');
            return;
        }
        else if (password.length === 0) {
            showMessage('密码不能为空');
            return;
        }
        $.ajax({
            url: '/api/login/login',
            type: 'POST',
            data: {
                phone: phone,
                password: password
            },
            dataType: 'json'
        }).then(function (json) {
            if (json.success) {
                window.location.href = '/';
            }
            else {
                showMessage('手机号或者密码错误');
            }
        }, function () {
            showMessage('发送登录请求失败');
        });
    }

    function resetpwd() {
        var me = this;
        if (!phoneRegex.test(this.reset.phone)) {
            showMessage('手机号不合法');
            return;
        }
        if (me.reset.verifyCode.length === 0) {
            showMessage('验证码不能为空');
            return;
        }
        var newPwd = $.trim(me.reset.newPassword);
        if (newPwd.length === 0) {
            showMessage('新密码不能为空');
            return;
        }
        if (newPwd !== $.trim(me.reset.confirmPassword)) {
            showMessage('两次密码输入不一致');
            return;
        }
        $.ajax({
            url: '/api/user-company/self-reset-password',
            type: 'POST',
            data: {
                phone: me.reset.phone,
                verifyCode: me.reset.verifyCode,
                newPassword: newPwd
            },
            dataType: 'json'
        }).then(function (json) {
            if (json.success) {
                showMessage('重置密码成功，请重新登录');
                me.viewType = 'login';
            }
            else {
                showMessage(json.message);
            }
        }, function () {
            showMessage('发送网络请求失败');
        });
    }

    function sendVerifyCode() {
        var me = this;
        if (this.sendVerifyCodeTime !== VERIFY_CODE_INTERVAL) {
            return;
        }
        if (!phoneRegex.test(this.reset.phone)) {
            showMessage('手机号不合法');
            return;
        }
        $.ajax({
            url: '/api/user-company/send-verification-code',
            type: 'POST',
            data: {
                phone: this.reset.phone
            },
            dataType: 'json'
        }).then(function (json) {
            if (json.success) {
                waitResendVerifyCode.call(me);
                showMessage('验证码已发送，请注意查收');
            }
            else {
                showMessage(json.message);
            }
        }, function () {
            showMessage('获取验证码失败');
        });
    }

    function waitResendVerifyCode() {
        var me = this;
        me.sendVerifyCodeTime = me.sendVerifyCodeTime - 1;
        if (me.sendVerifyCodeTime > 0) {
            setTimeout(function () {
                waitResendVerifyCode.call(me);
            }, 1000);
        }
        else {
            me.sendVerifyCodeTime = VERIFY_CODE_INTERVAL;
        }
    }

    function start() {
        vm = new Vue({
            el: document.body,
            data: {
                phone: '',
                password: '',
                showError: false,
                message: '',
                viewType: 'login',
                sendVerifyCodeTime: VERIFY_CODE_INTERVAL,
                reset: {
                    phone: '',
                    verifyCode: '',
                    newPassword: '',
                    confirmPassword: ''
                }
            },
            computed: {
                sendVerifyCodeText: function () {
                    return this.sendVerifyCodeTime === VERIFY_CODE_INTERVAL ? '获取验证码': this.sendVerifyCodeTime + '秒';
                },
                canSendVerifyCode: function () {
                    return /^1[3|4|5|7|8]\d{9}$/.test(this.reset.phone) && this.sendVerifyCodeTime === VERIFY_CODE_INTERVAL;
                }
            },
            methods: {
                submit: submit,
                resetpwd: resetpwd,
                sendVerifyCode: sendVerifyCode
            }
        });
    }
    return {
        start: start
    };
});