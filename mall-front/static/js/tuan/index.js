(function ($) {

    var USER = GLOBAL['USER'];
    Vue.config.delimiters = ['${', '}'];
    $.ajaxSettings.beforeSend = function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name=_csrf]').attr('content'));
    };
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
            sign: {
                username: '',
                phone: USER.isGuest ? '' : USER.phone,
                verifyCode: '',
                intention: [],
                buyway: ''
            },
            isGuest: USER.isGuest,
            verifyCodeTime: 60
        }, window.BBNS),
        computed: {
            canSendVerifyCode: function () {
                return this.verifyCodeTime !== 60;
            },
            verifyCodeText: function () {
                return this.verifyCodeTime === 60 ? '获取验证码' : this.verifyCodeTime + '秒';
            }
        },
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
                    $('.countdown').html('<div class="tuan-end">团购已开始</div>');
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
                $('.countdown').html('<div class="tuan-end">团购已开始</div>');
            }
            else {
                timer = setInterval(calcTime, 1000);
            }

            if (this.checkOrder == 1) {
                setTimeout(function () {
                    checkSignupSatus();
                }, 1000);
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
        methods: {
            sendVerifyCode: sendVerifyCode,
            signup: function () {
                var sign = this.sign;
                if (sign.intention.length === 0) {
                    showTips('请选择期望购买的车型');
                    return;
                }
                if (sign.buyway.length === 0) {
                    showTips('请选择期望的购车方式');
                    return;
                }
                if (sign.username.length === 0) {
                    showTips('请输入您的姓名');
                    return;
                }
                if (sign.phone.length === 0) {
                    showTips('请输入您的手机号');
                    return;
                }
                if (!/^1[3|4|5|7|8]\d{9}$/.test(sign.phone)) {
                    showTips('手机号不合法');
                    return;
                }
                if (this.isGuest) {
                    login();
                }
                else {
                    signup();
                }
            }

        }
    });

    function showTips(msg, delay) {
        $.tips({
            content: msg,
            stayTime: delay || 2000,
            type: 'warn'
        });
    }

    function signup() {
        var sign = vm.sign;
        var param = {
            phone: sign.phone,
            name: sign.username,
            intention: sign.intention,
            tuanId: vm.tuanId,
            carBuyingWay: sign.buyway
        };
        if (vm.signIn == 1) {
            param.signIn = 1;
        }
        var $load = $.loading({
            content: '正在报名中'
        });
        $.ajax({
            url:'/tuan/sign-up',
            type: 'post',
            dataType: 'json',
            data: param
        }).then(function (json) {
            if (json.success) {
                showTips('报名成功');
                var orderId = json.data.orderId;
                setTimeout(function () {
                    window.location.href = '/tuan/order?orderId=' + orderId;
                }, 2000);
            }
            else {
                showTips(json.message);
                checkSignupSatus();
            }
        }, function () {
            showTips('发送请求失败，请稍后重试');
        }).always(function () {
            $load.loading('hide');
        });
    }

    /**
     * 检查一下用户是否已经报名该团购了，如果有订单，则直接进入订单页面
     */
    function checkSignupSatus() {
        $.ajax({
            url:'/tuan/get-tuan-order',
            type: 'get',
            dataType: 'json',
            data: {
                tuanId: vm.tuanId
            }
        }).then(function (json) {
            if(json.success && json.data){
                window.location.href = '/tuan/order?orderId=' + json.data.order_id;
            }
        });
    }

    function login() {
        var sign = vm.sign;
        if (sign.verifyCode.length === 0) {
            showTips('请输入验证码');
            return;
        }
        var $load = $.loading({
            content: '登录中'
        });
        $.ajax({
            url: '/site/login',
            type: 'POST',
            dataType: 'json',
            data: {
                phone: sign.phone,
                verifyCode: sign.verifyCode
            }
        }).then(function (json) {
            if (json.success) {
                vm.isGuest = false;
                signup();
            }
            else {
                var message = json.message || '未知错误';
                if (typeof message !== 'string') {
                    for (var i in json.message) {
                        if (json.message[i]) {
                            message += json.message[i].toString();
                        }
                    }
                }
                showTips(message);
            }
        }, function () {
            showTips('发送请求失败，请稍后重试');
        }).always(function () {
            $load.loading('hide');
        });
    }

    function reduceVerifyCodeTime() {
        vm.verifyCodeTime = vm.verifyCodeTime - 1;
        if (vm.verifyCodeTime > 0) {
            setTimeout(function () {
                reduceVerifyCodeTime();
            }, 1000);
        }
        else {
            vm.verifyCodeTime = 60;
        }
    }

    function sendVerifyCode() {
        var sign = vm.sign;
        if (sign.phone.length === 0) {
            showTips('请输入您的手机号');
            return;
        }
        if (!/^1[3|4|5|7|8]\d{9}$/.test(sign.phone)) {
            showTips('手机号不合法');
            return;
        }
        $.post('/sms/send-verification-code', {
            mobile: vm.sign.phone
        }).then(function (data) {
            if(!data.success){
                showTips(json.message);
                return;
            }
            reduceVerifyCodeTime();
        }, function () {
            showTips('发送验证码失败,请稍后重试');
        });
    }

    function buildSignupView() {
        $('.intention input').on('change', function (e) {
            if ($('.intention input:checked').length > 2) {
                showTips('最多只能选择2个期望车型');
                vm.$nextTick(function () {
                    vm.sign.intention.splice(2);
                });
            }
        });
    }
    window.vm = vm;
    $(function () {
        buildSignupView();
    });
})(Zepto);