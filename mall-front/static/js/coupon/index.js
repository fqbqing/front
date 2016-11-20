
(function () {
    var CODE_INTERVAL = 60;
    var USER = GLOBAL['USER'];
    Vue.config.delimiters = ['${', '}'];
    var vm = new Vue({
        el: 'body',
        data: $.extend({
            showLogin: 0,
            phone: USER.isGuest ? '' : USER.phone ,
            verifyCode: '',
            loginErrorMessage: '',
            verifyCodeTime: CODE_INTERVAL,
            loginLoading: false,
            activityId: window.BBNS.couponActivity.activityId,
            isGuest: USER.isGuest
        }, window.BBNS),
        ready: function () {

        },
        computed: {
            canSendVerifyCode: function () {
                return /^1[3|4|5|7|8]\d{9}$/.test(this.phone) && this.verifyCodeTime === CODE_INTERVAL;
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
                }
            },
            sendVerifyCode: function () {
                var me = this;
                me.verifyCodeTime = CODE_INTERVAL;
                $.post('/sms/send-verification-code', {
                    mobile: this.phone
                }).then(function (data) {
                    if(!data.success){
                        me.loginErrorMessage = data.message;
                        return ;
                    }
                    me.waitVerifyCode();
                }, function () {
                    me.loginErrorMessage = '发送验证码失败,请稍后重试';
                });
            },
            signup: function () {
                var me = this;
                if (!$.trim(this.name)) {
                    me.loginErrorMessage = '姓名不能为空';
                    return;
                }
                if (!/^1[3|4|5|7|8]\d{9}$/.test(this.phone)) {
                    me.loginErrorMessage = '手机号不合法';
                    return;
                }
                if(this.isGuest){
                    if (!/^\d+$/.test(this.verifyCode)) {
                        me.loginErrorMessage = '验证码只能是数字';
                        return;
                    }
                }
                me.loginLoading = true;
                if (this.isGuest) {
                    login();
                }
                else {
                    signup();
                }
            },
            checkCoupon: function () {
                window.location.href = '/site/login-c?url=' + encodeURI(window.location.href);
            }
        }
    });

    function signup() {
        // 登录成功
        $.ajax({
            url: '/coupon/sign-up',
            type: 'get',
            dataType: 'json',
            data: {
                activityId: vm.activityId,
                name: vm.name
            }
        }).then(function (json) {
            if(!vm.signIn){
                if(!json.success){
                    vm.loginLoading = false;
                    vm.loginErrorMessage = json.message;
                }else{
                    window.location.href = '/coupon/show-order?orderId=' + json.data.orderId;
                }

            }else{
                window.location.href = '/coupon/sign-in?activityId=' + vm.activityId;
            }

        }, function(){
            vm.loginLoading = false;
            vm.loginErrorMessage = '发送请求失败,请稍后重试';
        });
    }

    function login() {
        $.ajax({
            url: '/site/login',
            type: 'POST',
            dataType: 'json',
            data: {
                phone: vm.phone,
                verifyCode: vm.verifyCode
            }
        }).then(function (json) {
            if (json.success) {
                vm.isGuest = false;
                signup();
            }
            else {
                vm.loginLoading = false;
                if (typeof json.message === 'string') {
                    vm.loginErrorMessage = json.message;
                }
                else {
                    var message = '';
                    for (var i in json.message) {
                        if (json.message[i]) {
                            message += json.message[i].toString();
                        }
                    }
                    vm.loginErrorMessage = message;
                }
            }
        }, function () {
            vm.loginLoading = false;
            vm.loginErrorMessage = '发送请求失败,请稍后重试';
        });
    }
})();
