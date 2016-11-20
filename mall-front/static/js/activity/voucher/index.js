$(function () {
    var activityId = $('[name=activityId]').val();
    var voucherId = $('[name=voucherId]').val();
    var voucher = new Voucher(activityId, voucherId);

    $('.btn-claim').on('click', function () {
        voucher.claim().then(function (orderId) {
            $.tips({
                content: '领取成功',
                stayTime: 2000,
                type: 'warn'
            });
            setTimeout(function () {
                window.location.href = '/activity/voucher/order?orderId=' + orderId;
            }, 2000);
        }, function (msg) {
            $.tips({
                content: msg,
                stayTime: 2000,
                type: 'error'
            });
        });
    });

    $('.btn-pay').on('click', function () {
        voucher.pay().then(function (payUrl) {
            window.location.href = payUrl;
        }, function (msg) {
            $.tips({
                content: msg,
                stayTime: 2000,
                type: 'error'
            });
        });
    });
});