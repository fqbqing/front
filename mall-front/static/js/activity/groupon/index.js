(function ($) {

    var USER = GLOBAL['USER'];
    Vue.config.delimiters = ['${', '}'];
    $.ajaxSettings.beforeSend = function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name=_csrf]').attr('content'));
    };
    // Get a regular interval for drawing to the screen
    window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimaitonFrame ||
            function (callback) {
                window.setTimeout(callback, 1000/60);
            };
    })();
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
                username: USER.isGuest ? '' : USER.name,
                phone: USER.isGuest ? '' : USER.phone,
                verifyCode: ''
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
            //me.endTime = parseInt((new Date()).getTime() / 1000, 10) + 20;
            // 计算倒计时
            function calcTime() {
                var now = parseInt((new Date()).getTime() / 1000, 10);
                var end = me.endTime;

                if (now > end) {
                    $('.countdown').html('<div class="tuan-end">活动已开始</div>');
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

                window.requestAnimFrame(calcTime);
            }
            this.$nextTick(function () {
                calcTime();
            });

            if (this.checkOrder == 1) {
                setTimeout(function () {
                    checkSignupStatus();
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
                var option = {
                    name: $.trim(sign.username),
                    phone: $.trim(sign.phone)
                };
                var flag = false;
                $.each(this.signupOptions, function (i, item) {
                    var value = '';
                    if (item.type === 'text') {
                        value = $('input[name=' + item.name + ']').val();
                    }
                    else {
                        value = $.map($('input[name=' + item.name + ']:checked'), function (el) {
                            return el.value;
                        }).join(',');
                    }
                    if (!!item.required && value.length === 0) {
                        showTips(item.name + '不能为空');
                        flag = true;
                        return false;
                    }
                    option[item.name] = value;
                });
                if (flag) {
                    return;
                }
                if (option.name.length === 0) {
                    showTips('请输入您的姓名');
                    return;
                }
                if (option.phone.length === 0) {
                    showTips('请输入您的手机号');
                    return;
                }
                if (!/^1[3|4|5|7|8]\d{9}$/.test(option.phone)) {
                    showTips('手机号不合法');
                    return;
                }
                if (this.isGuest) {
                    option.verifyCode = $.trim(sign.verifyCode);
                    if (option.verifyCode.length === 0) {
                        showTips('请输入验证码');
                        return;
                    }
                }
                signup(option);
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

    function signup(option) {
        var sign = vm.sign;
        var param = $.extend({
            phone: sign.phone,
            name: sign.username,
            id: vm.activityId
        }, option);
        if (vm.signIn == 1) {
            param.signIn = 1;
        }
        var $load = $.loading({
            content: '正在报名中'
        });
        $.ajax({
            url:'/activity/groupon/signup',
            type: 'post',
            dataType: 'json',
            data: param
        }).then(function (json) {
            if (json.success) {
                showTips('报名成功');
                var id = json.data.id;
                setTimeout(function () {
                    window.location.href = '/activity/groupon/signup-detail?signupId=' + id;
                }, 2000);
            }
            else {
                showTips(json.message);
                checkSignupStatus();
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
    function checkSignupStatus() {
        $.ajax({
            url:'/activity/groupon/get-signup',
            type: 'get',
            dataType: 'json',
            data: {
                id: vm.activityId
            }
        }).then(function (json) {
            if(json.success && json.data){
                window.location.href = '/activity/groupon/signup-detail?signupId=' + json.data.id;
            }
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

    window.vm = vm;
})(Zepto);