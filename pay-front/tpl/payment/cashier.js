/**
 * Created by lifayu on 16/5/11.
 */

$(function () {

    $.ajaxSetup({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name=_csrf]').attr('content'));
        }
    });

    function getPayParams() {
        var args = {};
        args.paymentId = $('[name=paymentId]').val();
        args.paySign = $('[name=paySign]').val();
        return args;
    }
    function alipay() {

        var args = getPayParams();
        var newTab = window.open('about:blank');
        $.ajax({
            url: '/ali-pay/pay',
            type: 'POST',
            dataType: 'json',
            data: args
        }).then(function (json) {
            if (json.errorCode === 0) {
                var url = json.data.url;
                if (json.data.isInWeixin) {
                    url = '/iframe.php?title=支付宝支付&u=' + encodeURIComponent(url);
                }
                newTab.location.href = url;
                showPayConfirm();
            }
            else {
                newTab.close();
                YJ.layer.alert('提示信息', json.message);
            }
        }, function () {
            newTab.close();
            YJ.layer.alert('提示信息', '发送网络请求失败，请稍后重试！');
        });
    }

    function weixinpay() {
        var args = getPayParams();
        window.open('/wx-pay/pay/?' + $.param(args));
        showPayConfirm();
    }

    function showPayConfirm() {
        $('#confirmModal').modal({
            backdrop: 'static',
            show: true
        }).find('.btn-main').off('click').on('click', function () {
            checkOrderForConfirm();
        });
    }

    function checkOrderForConfirm() {
        $.ajax({
            url: '/wx-pay/find-payment',
            type: 'GET',
            data: getPayParams(),
            dataType: 'json'
        }).then(function (json) {
            if (json.errorCode === 0 && json.data.status === 2) {
                if (json.data.return_url) {
                    window.location.replace(json.data.return_url);
                }
            }
            else {
                YJ.layer.alert('未支付，如已完成支付，请稍后再查询订单情况');
            }
        }, function (error) {
            YJ.layer.alert('查询订单失败，请稍后重试');
        });
    }

    var $payMessage = $('.pay-message');
    //$('[name=paytype]').on('change', function () {
    //    $payMessage.slideUp();
    //});
    $('.paytype').on('click', function () {
        $('.paytype').removeClass('paytype-active');
        $(this).addClass('paytype-active');
        $payMessage.slideUp();
    });
    $('#confirmPay').on('click', function () {
        //var paytype = $('[name=paytype]:checked').val();
        var paytype = '';
        var $paytype = $('.paytype-active label');
        if ($paytype.length) {
            paytype = $paytype.attr('data-value');
        }
        if (!paytype) {
            $payMessage.slideDown();
            return;
        }

        if (paytype === 'weixin') {
            weixinpay();
        }
        else if (paytype === 'alipay') {
            alipay();
        }
    });
});