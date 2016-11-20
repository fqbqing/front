/**
 * Created by Administrator on 2015/12/25 0025.
 */

(function () {
    var CODE_INTERVAL = 60;
    Vue.config.delimiters = ['${', '}'];
    $.ajaxSetup({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name=_csrf]').attr('content'));
        }
    });
    var vm = new Vue({
        el: 'body',
        data: $.extend({
            countdown: {
                d1: 0,
                d2: 0,
                h1: 0,
                h2: 0,
                m1: 0,
                m2: 0,
                s1: 0,
                s2: 0
            },
            boxShow:false,
            showLogin: 0,
            phone: '',
            verifyCode: '',
            loginErrorMessage: '',
            verifyCodeTime: CODE_INTERVAL,
            loginLoading: false,
            showBox: false,
            isFavorite: false
        }, window.BBNS),
        ready: function () {
            var me = this;
            var timer = null;
            //me.endTime = parseInt((new Date()).getTime() / 1000, 10) + 20;
            // 计算倒计时
            function calcTime() {
                var now = parseInt((new Date()).getTime() / 1000, 10);
                var end = me.endTime;

                if (now > end) {
                    clearInterval(timer);
                    $('.countdown').html('团购已开始');
                    return;
                }

                var interval = end - now;
                var d = parseInt(interval / (24 * 60 * 60), 10);
                me.countdown.d1 = parseInt(d / 10, 0);
                me.countdown.d2 = d % 10;

                interval = interval % (24 * 60 * 60);
                var h = parseInt(interval / (60 * 60), 10);
                me.countdown.h1 = parseInt(h / 10, 0);
                me.countdown.h2 = h % 10;

                interval = interval % (60 * 60);
                var m = parseInt(interval / 60, 10);
                me.countdown.m1 = parseInt(m / 10, 0);
                me.countdown.m2 = m % 10;

                interval = interval % 60;
                var s = parseInt(interval, 10);
                me.countdown.s1 = parseInt(s / 10, 0);
                me.countdown.s2 = s % 10;
            }
            var now = parseInt((new Date()).getTime() / 1000, 10);
            if (now > me.endTime) {
                $('.countdown').html('团购已开始');
            }
            else {
                timer = setInterval(calcTime, 1000);
            }
        },
        created: function () {
            $(window).on('scroll.common', function () {
                var st = $(this).scrollTop();
                if (st > 200) {
                    $('#totop').show();
                }
                else {
                    $('#totop').hide();
                }
            });
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
                me.loginLoading = true;
                $.ajax({
                    url: '/site/login',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        phone: me.phone,
                        verifyCode: me.verifyCode
                    }
                }).then(function (json) {
                    if (json.success) {
                        // 登录成功
                        if (me.showLogin === 1) {
                            $.ajax({
                                url: '/tuan/get-tuan-order',
                                type: 'get',
                                dataType: 'json',
                                data: {
                                    tuanId: me.tuanId
                                }
                            }).then(function (json) {
                                if(!json.data){
                                    me.showLogin = 0;
                                    me.showBox = true;
                                }else{
                                    window.location.href = '/tuan/tuan-order-detail?orderId=' + json.data.order_id;
                                }
                            }, function(){
                                window.location.reload();
                            });
                        }
                        else if (me.showLogin === 2) {
                            window.location.href = '/tuan/show-tuan-detail?tuanId=' + me.tuanId;
                        }
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
            },
            refresh: function () {
                window.location.href = '/tuan/show-tuan-detail?tuanId=' + this.tuanId;
            },
            showFavorite: function () {
                this.isFavorite = !this.isFavorite;
            }
        }
    });
})();