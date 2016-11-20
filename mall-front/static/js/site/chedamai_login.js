
(function () {
    var CODE_INTERVAL = 60;
    Vue.config.delimiters = ['${', '}'];
    var vm = new Vue({
        el: 'body',
        data: {
            phone: '' ,
            verifyCode: '',
            username: '',
            hasName: true,
            codeBtnState: true,
            loginErrorMessage: '',
            verifyCodeTime: CODE_INTERVAL,
            loginLoading: false
        },
        ready: function () {
        },
        computed: {
            canSendVerifyCode: function () {
                return /^1[3|4|5|7|8]\d{9}$/.test(this.phone) && this.codeBtnState;
            },
            verifyCodeText: function () {
                if (this.verifyCodeTime === CODE_INTERVAL) {
                    return '获取验证码';
                }
                return this.verifyCodeTime + '秒';
            },
            loginText: function () {
                return this.loginLoading ? '验证中' : '确定';
            }
        },
        methods: {
            hideErrorMessage: function () {
                this.loginErrorMessage = '';
            },
            waitVerifyCode: function () {
                var me = this;
                if (me.verifyCodeTime > 0) {
                    setTimeout(function () {
                        me.verifyCodeTime--;
                        me.waitVerifyCode();
                    }, 1000);
                }
                else if (me.verifyCodeTime === 0) {
                    me.verifyCodeTime = CODE_INTERVAL;
                    me.codeBtnState = true;
                }
            },
            sendVerifyCode: function () {
                var me = this;
                me.hasName = true;
                me.verifyCodeTime = CODE_INTERVAL;
                me.codeBtnState = false;

                $.post('/sms/send-verification-code', {
                    mobile: this.phone
                }).then(function (json) {
                    if(!json.success){
                        me.codeBtnState = true;
                        me.loginErrorMessage = json.message;
                        return ;
                    }
                    me.hasName = json.data.hasName;
                    me.waitVerifyCode();
                }, function () {
                    me.loginErrorMessage = '发送验证码失败,请稍后重试';
                    me.codeBtnState = true;
                });
            },
            login: function () {
                var me = this;
                if (!/^1[3|4|5|7|8]\d{9}$/.test(this.phone)) {
                    me.loginErrorMessage = '手机号不合法';
                    return;
                }
                if (!/^\d+$/.test(this.verifyCode)) {
                    me.loginErrorMessage = '验证码只能是数字';
                    return;
                }

                var params = {
                    phone: me.phone,
                    verifyCode: me.verifyCode
                };
                if (!this.hasName) {
                    if (this.username.length === 0) {
                        me.loginErrorMessage = '请输入您的姓名';
                        return;
                    }
                    params.name = this.username;
                }

                me.loginLoading = true;
                $.ajax({
                    url: '/site/login',
                    type: 'POST',
                    dataType: 'json',
                    data: params
                }).then(function (json) {
                    if (json.success) {
                        var url = $('input[name=url]').val() || '/site/index';
                        top.location.href = url;
                    }
                    else {
                        me.loginLoading = false;
                        if (typeof json.message === 'string') {
                            me.loginErrorMessage = json.message;
                        }
                        else {
                            var message = '';
                            for (var i in json.message) {
                                if (json.message[i]) {
                                    message += json.message[i].toString();
                                }
                            }
                            me.loginErrorMessage = message;
                        }
                    }
                }, function () {
                    me.loginLoading = false;
                    me.loginErrorMessage = '发送请求失败,请稍后重试';
                });
            }
        }
    });
})();