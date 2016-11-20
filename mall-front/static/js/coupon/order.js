(function ($) {
    Vue.config.delimiters = ['${', '}'];
    $.ajaxSettings.beforeSend = function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name=_csrf]').attr('content'));
    };
    var text_limit_length = 50;
    var vm = new Vue({
        el: 'body',
        data: $.extend({
            isWinListShow: false,
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
            win_status: 1,
            order_static: {
                num: 1,
                time:  window.BBNS.lottery.configs[0].draw_time
            },
            countdown_order: null,
            guide_expand_text: ''
        }, window.BBNS),
        ready: function () {
            var me = this;
            var timer = null;
            this.guide_expand_text = this.activity.couponUsedDetailIntroduction.length > text_limit_length ? this.activity.couponUsedDetailIntroduction.substr(0,text_limit_length) + '...' :  this.activity.couponUsedDetailIntroduction;

            //me.endTime = parseInt((new Date()).getTime() / 1000, 10) + 20;
            // 计算倒计时
            function calcTime(end) {
                return function () {
                    var now = parseInt((new Date()).getTime() / 1000, 10);
                    if (now > end) {
                        clearInterval(timer);
                        drawPrize();
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
            }

            function drawPrize(){
                var lottery_configs = me.lottery.configs;//抽奖次数的配置信息
                var configs_length = me.lottery.configs.length;
                var ahead_time = 57600; //提前16个小时倒计时
                if (!me.user.winRecord) {
                    if (now < me.lottery.startTime) {
                        //抽奖没开始
                        me.win_status = 1;
                        me.order_static = {
                            num: 1,
                            time:  lottery_configs[0].draw_time
                        }
                    }
                    else if (now > me.lottery.startTime && now < lottery_configs[configs_length-1].draw_time) {
                        //抽奖中，没结束
                        var left_time = me.lottery.startTime;
                        for (var i = 0;i < configs_length;i++) {
                            if (now > left_time && now < lottery_configs[i].draw_time) {
                                //第n次动态
                                me.win_status = 2;
                                me.countdown_order = i+1;
                                timer = setInterval(calcTime(lottery_configs[i].draw_time), 1000);
                                return ;
                            }
                            else if ((i+1) < configs_length && now > lottery_configs[i].draw_time && now < (lottery_configs[i+1].draw_time - ahead_time)) {
                                //第n+1次静态
                                me.win_status = 1;
                                me.order_static = {
                                    num: i+2,
                                    time:  lottery_configs[i+1].draw_time
                                };
                                return ;
                            }
                            if ( i + 1 < configs_length) {
                                left_time = lottery_configs[i+1].draw_time - ahead_time;
                            }
                        }
                    }
                    else if (now > lottery_configs[configs_length-1].draw_time) {
                        me.win_status = 4;
                    }
                }
                else {
                    me.win_status = 3;
                }
            }
            var now = parseInt((new Date()).getTime() / 1000, 10);
            drawPrize();
        },
        methods: {
            showWinList: function () {
                this.isWinListShow = !this.isWinListShow;
            },
            scanQRCode: function () {
                var me = this;
                wx.scanQRCode({
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                    }
                });
            },
            refresh: function () {
                window.location.reload();
            },
            guideExpand: function () {
                this.guide_expand_text = this.activity.couponUsedDetailIntroduction.length === this.guide_expand_text.length ? this.activity.couponUsedDetailIntroduction.substr(0,text_limit_length) + '...' :  this.activity.couponUsedDetailIntroduction;
            }
        },
        filters:{
            dateFormat: function (value, formatrer) {
                formatrer = formatrer || this.timeFormatter;
                if(value && value != 0){
                    value = +value;
                    if (value < 1000000000000) {
                        value *= 1000;
                    }
                    if (value > 2000000000000) {
                        return '';
                    }
                }else{
                    return '';
                }
                return moment(value).format(formatrer);
            },
            phoneSubstr: function (value) {
                return value.substr(value.length-4);
            },
            nameSubstr: function (value) {
                return value.substring(0,1)+"**";
            },
            order: function (value) {
                var CONS_ORDER = ['一','二','三', '四','五','六','七','八','九','十'];
                return value > 0 ? CONS_ORDER[value-1] : '';
            }
        }
    });

    var scroll = new fz.Scroll('.ui-scroller', {
        scrollY: true
    });

})(Zepto);
