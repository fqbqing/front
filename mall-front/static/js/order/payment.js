/**
 * Created by lifayu on 15/12/2.
 */

(function ($) {
    var orderId;

    function init() {
        orderId = $('#orderId').val();
        $('.payment-type .payment').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
        $('#payBtn').on('click', function () {
            var title = $('.payment-type .payment.active').attr('id');
            if (title == 'wechatpay') {
                //PC微信
                openInNewWindow('/weixin-pay/pay/?orderId=' + orderId, '微信支付');
                //window.open('/weixin-pay/pay/?orderId=' + orderId);
            }
            else {
                // 支付宝支付
                //window.open('/ali-pay/pay?orderId=' + orderId);
                // 以下方式需要进行判断,只在微信中才需要这样做
                openInNewWindow('/ali-pay/pay?orderId=' + orderId, '支付宝支付');
            }
        });
    }

    function openInNewWindow(url, title) {
        //var url = '/iframe.php?u=' + encodeURIComponent(url) + '&title=' + title;
        window.open(url);
        layer.confirm('是否已经完成了订单支付？', {
            btn: ['已完成支付', '未支付'] //按钮
        }, function () {
            window.location.href = '/order/detail?orderId=' + orderId;
        }, function () {
        });
    }

    $(function () {
        init();
    });
})(window.jQuery);