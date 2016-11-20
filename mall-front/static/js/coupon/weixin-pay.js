(function ($, win) {
    var BBNS = win.BBNS;

    var timer;

    var USER = GLOBAL['USER'];
    Vue.config.delimiters = ['${', '}'];
    $.ajaxSettings.beforeSend = function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name=_csrf]').attr('content'));
    };

    function showTips(msg, delay) {
        $.tips({
            content: msg,
            stayTime: delay || 2000,
            type: 'warn'
        });
    }

    var mv = new Vue({
        el: 'body',
        data: {
            qrcode: '',
            deposit: '',
            wechat: env.browser.wechat
        },
        ready: function () {
            var me = this;
            var $load = $.loading({
                content: '正在创建订单…'
            });
            $.ajax({
                url:'/coupon/weixin-create-payment',
                type: 'get',
                dataType: 'json',
                data: {
                    orderId: BBNS.orderId
                }
            }).then(function (json) {
                //alert(json.success);
                if (json.success) {
                    if(env.browser.wechat){
                        //alert(json.success);
                        tryPay(json.data);
                    }
                    else {
                        me.deposit = parseInt(json.data.deposit) / 100;
                        me.qrcode = json.data.image;
                    }
                    timer = setInterval(function () {
                        onpaysuccess(BBNS.orderId);
                    }, 2000);
                }
                else {
                    showTips(json.message);
                }
            }, function () {
                showTips('发送请求失败，请稍后重试');
            }).always(function () {
                $load.loading('hide');
            });
        },
        methods: {
        }
    });

    function tryPay(data) {
        //alert('data');
        //alert(data);
        if (typeof WeixinJSBridge == 'undefined') {
            //alert('undefined');
            function callback() {
                onBridgeReady(data);
            }
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', callback, false);
            }
            else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', callback);
                document.attachEvent('onWeixinJSBridgeReady', callback);
            }
        }
        else {
            //alert('else');
            onBridgeReady(data);
        }
    }

    function onpaysuccess(orderId) {
        //alert('onpaysuccess');
        //ajax请求
        $.ajax({
            url: '/coupon/payment-status',
            type: 'POST',
            data: {
                orderId: orderId
            },
            dataType: 'json'
        }).then(function (json) {
            //alert('/coupon/payment-status');
            if (json.success) {
                clearInterval(timer);
                showTips('支付成功');
                setTimeout(function () {
                   window.location.href = '/coupon/show-order?orderId=' + orderId;

                }, 1000)
            }
        }, function (error) {
        });
    }

    function onBridgeReady(data) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', data,
            function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                }
                else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                    showTips(res.err_desc, 5000);
                }
            }
        );
    }

})(Zepto, window);