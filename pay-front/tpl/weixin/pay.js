$(function () {

    $.ajaxSetup({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name=_csrf]').attr('content'));
        }
    });

    // 定时轮循检查支付结果
    var timer = null;

    var payQuery = {};

    function getPayParams() {
        var args = {};
        args.paymentId = $('[name=paymentId]').val();
        args.paySign = $('[name=paySign]').val();
        return args;
    }

    function showTips(msg) {
        YJ.layer.alert(msg);
    }

    /**
     * 尝试打开微信支付窗口
     *
     * @param data
     */
    function tryPay(data) {
        payQuery = data;
        if (typeof WeixinJSBridge == 'undefined') {
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
            onBridgeReady(data);
        }
    }

    /**
     * 支付成功后回调
     *
     * @param orderId
     */
    function onpaysuccess(params) {
        //ajax请求
        $.ajax({
            url: '/wx-pay/find-payment',
            type: 'GET',
            data: params,
            dataType: 'json'
        }).then(function (json) {
            if (json.errorCode === 0 && json.data.status === 2) {
                clearInterval(timer);
                showTips('支付成功');
                if (json.data.return_url) {
                    setTimeout(function () {
                        window.location.href = json.data.return_url;
                    }, 1000);
                }
            }
        }, function (error) {
        });
    }

    function cancelPay() {
        $('.paying').hide();
        $('.pay-fail').hide();
        $('.pay-cancel').show();
    }

    function payFail(err) {
        alert(err);
        $('.paying').hide();
        $('.pay-fail').html(err).show();
        $('.pay-cancel').hide();
    }

    /**
     * 启动微信支付窗口
     *
     * @param data
     */
    function onBridgeReady(data) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', data,
            function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    onpaysuccess(getPayParams());
                }
                else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                    //showTips(res.err_desc, 5000);
                    payFail(res.err_desc);
                }
                else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                    cancelPay();
                }
            }
        );
    }

    $('#rePay').on('click', function () {
        $('.paying').show();
        $('.pay-cancel').hide();
        $('.pay-fail').hide();
        tryPay(payQuery);
    });

    var param = getPayParams();
    YJ.loading.show('正在创建支付单…');
    $.ajax({
        url:'/wx-pay/create-payment',
        type: 'get',
        dataType: 'json',
        data: param
    }).then(function (json) {
        if (json.errorCode === 0) {
            if(isInWeixin){
                tryPay(json.data);
            }
            else {
                $('#qrcode').attr('src', json.data.image);
            }
            timer = setInterval(function () {
                 onpaysuccess(param);
            }, 2000);
        }
        else {
            showTips(json.message);
        }
    }, function () {
        showTips('发送请求失败，请稍后重试');
    }).always(function () {
        YJ.loading.hide();
    });
});