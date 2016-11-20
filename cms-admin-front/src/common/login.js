/**
 * Created by lifayu on 16/1/11.
 */

define(function (require) {

    var Vue = require('vue');

    var $ = require('jquery');

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

    function start() {
        vm = new Vue({
            el: document.body,
            data: {
                phone: '',
                password: '',
                showError: false,
                message: ''
            },
            methods: {
                submit: submit
            }
        });
    }
    return {
        start: start
    };
});