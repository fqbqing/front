/**
 * Created by lifayu on 15/12/2.
 */

(function ($) {
    var timer = 0;
    function init() {
        var testUrl = location.href;
        var result = urlToObject(testUrl);
        var orderId = result['orderId'];
        createPayment(orderId);
        $("#repayBtn").click(function () {
            createPayment(orderId);
        });
    }

    $(function () {
        init();
    });

    function urlToObject(url) {
        var urlObject = {};
        if (/\?/.test(url)) {
            var urlString = url.substring(url.indexOf("?") + 1);
            var urlArray = urlString.split("&");
            for (var i = 0, len = urlArray.length; i < len; i++) {
                var urlItem = urlArray[i];
                var item = urlItem.split("=");
                urlObject[item[0]] = item[1];
            }
            return urlObject;
        }
    };
    function createPayment(orderId) {
        var loading = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
        $('#layui-layer1').css('top', '35%');
        var url = '/weixin-pay/create-payment?orderId=' + orderId;
        if($('#orderType').val() =="tuan"){
            url = "/tuan/weixin-create-payment?orderId="+ orderId;
        }
        $.ajax({
            url:url,
            type: 'get',
            dataType: 'json'
        }).then(function (json) {
            layer.closeAll('loading');
            var isInWeixin = $("#isInWeixin").val();
            if (isInWeixin) {
                if (json.success) {
                    if (typeof WeixinJSBridge == "undefined") {
                        function callback() {
                            onBridgeReady(json.data);
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
                        onBridgeReady(json.data);
                    }
                }
                else {
                    $('.fail-wrap').removeClass('none');
                    $('.errmsg').html(json.message);
                }
            }
            else {
                if (json.success) {
                    $('.fail-wrap').addClass('none');
                    $('.suc-wrap').removeClass('none');
                    $('.deposit').html(parseInt(json.data.deposit) / 100);
                    $('.wechat-qrcode').attr('src', json.data.image);

                }
                else {
                    $('.fail-wrap').removeClass('none');
                    $('.errmsg').html(json.message);
                }
            }
            /*根据状态看要不要轮询*/
            timer = setInterval(function () {
                onpaysuccess(orderId);
            }, 2000);
        }, function (error) {
            layer.closeAll('loading');
            layer.alert('发送请求失败,请稍后重试', {icon: 2});
        });
    }

    function onpaysuccess(orderId) {
        var url1 = '/order/payment-status?orderId=' + orderId;
        if($('#orderType').val() =="tuan"){
            url1 = "/tuan/payment-status?orderId="+ orderId;
        }
        var url2 = '/order/detail?orderId=' + orderId;
        if($('#orderType').val() =="tuan"){
            url2 = "/tuan/tuan-order-detail?orderId="+ orderId;
        }
        //ajax请求
        $.ajax({
            url:url1,
            type: 'get',
            dataType: 'json'
        }).then(function (json) {
            if (json.success) {
                clearInterval(timer);
                layer.msg("支付成功", {icon: 1}, function () {
                    setTimeout(function () {
                        window.location.href = url2;
                    }, 1000)
                });
            }
        }, function (error) {
        });

    }

    function onBridgeReady(data) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', data,
            function (res) {
                //alert(JSON.stringify(res));
                if (res.err_msg == "get_brand_wcpay_request:ok") {

                }
                else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                    $('.fail-wrap').removeClass('none');
                    $('.errmsg').html(res.err_desc);
                }
                //else {
                //    alert(JSON.stringify(res));
                //}
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠
            }
        );
    }

})(window.jQuery);