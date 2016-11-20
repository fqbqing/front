/**
 * @file 
 * @author ()
 */

define(function (require) {

    var $ = require('zepto');
    var config = {};

    config.template = require('./login.tpl.html');

	config.templateMainTarget = 'TPL_site_login';

    config.domEvents = {
	};

    function submit() {
        var me = this;
        var view = this.$view;
        var phone = this.phone;
        var password = this.password;
        if (phone.length === 0) {
            view.showTip('手机号不能为空', 'warn');
            return;
        }
        else if (password.length === 0) {
            view.showTip('密码不能为空', 'warn');
            return;
        }
        $.ajax({
            url: '/api/login/login',
            type: 'POST',
            data: {
                phone: phone,
                password: password
            },
            dataType: 'json',
            success: function (json) {
                if (json.success) {
                    window.location.replace(me.query.url || '/');
                    //window.location.href = me.query.url || '/';
                }
                else {
                    view.showTip('手机号或者密码错误', 'warn');
                }
            },
            error: function () {
                view.showTip('发送登录请求失败', 'warn');
            }
        });
    }

    config.vueOptions = {
        methods: {
            submit: submit
        }
    };

    return config;

});

