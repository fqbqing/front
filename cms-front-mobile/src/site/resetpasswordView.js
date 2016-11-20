/**
 * @file 
 * @author ()
 */

define(function (require) {

    var utils = require('common/utils');
    var exports = {};

    exports.template = require('./resetpassword.tpl.html');

	exports.templateMainTarget = 'TPL_site_resetpassword';

    exports.domEvents = {
	};

    exports.events = {
    };

    var VERIFY_CODE_INTERVAL = 60;

    function waitResendVerifyCode() {
        var me = this;
        me.verifyCodeTime = me.verifyCodeTime - 1;
        if (me.verifyCodeTime > 0) {
            setTimeout(function () {
                waitResendVerifyCode.call(me);
            }, 1000);
        }
        else {
            me.verifyCodeTime = VERIFY_CODE_INTERVAL;
            me.isVerifyCodeSended = false;
        }
    }

    exports.vueOptions = {
        data: {
            phone: '',
            verifyCode: '',
            newpwd: '',
            confirmpwd: '',
            isVerifyCodeSended: false,
            verifyCodeTime: VERIFY_CODE_INTERVAL
        },
        computed: {
            verifyCodeText: function () {
                return this.isVerifyCodeSended ? this.verifyCodeTime + '秒' : '获取验证码';
            }
        },
        methods: {
            sendVerifyCode: function () {
                var me = this;
                if (!this.phone) {
                    this.$view.showTip('手机号不能为空', 'warn');
                    return;
                }
                if (!utils.isPhoneValidate(this.phone)) {
                    this.$view.showTip('手机号不合法', 'warn');
                    return;
                }
                this.$view.model.sendVerifyCode(this.phone).then(function () {
                    me.isVerifyCodeSended = true;
                    waitResendVerifyCode.call(me);
                });
            },
            submit: function () {
                if (!this.phone) {
                    this.$view.showTip('手机号不能为空', 'warn');
                    return;
                }
                if (!utils.isPhoneValidate(this.phone)) {
                    this.$view.showTip('手机号不合法', 'warn');
                    return;
                }
                if (!this.verifyCode) {
                    this.$view.showTip('验证码不能为空');
                    return;
                }
                if (!this.newpwd) {
                    this.$view.showTip('新密码不能为空', 'warn');
                    return;
                }
                if (!this.confirmpwd) {
                    this.$view.showTip('请再次输入新密码', 'warn');
                    return;
                }
                if (this.newpwd !== this.confirmpwd) {
                    this.$view.showTip('新密码两次输入不一致', 'warn');
                    return;
                }
                this.$view.emit('RESET_PASSWORD', this.phone, this.verifyCode, this.newpwd);
            }
        }
    };

    return exports;
});

